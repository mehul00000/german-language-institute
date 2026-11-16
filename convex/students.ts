import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requirePermission, audit } from "./auth";

const studentFields = {
  name: v.string(),
  phone: v.string(),
  email: v.optional(v.string()),
  courseId: v.optional(v.id("courses")),
  admissionDate: v.number(),
  courseFees: v.number(),
  paymentStatus: v.union(v.literal("pending"), v.literal("partial"), v.literal("paid")),
  status: v.union(v.literal("active"), v.literal("completed"), v.literal("inactive")),
  notes: v.optional(v.string()),
};

export const create = mutation({
  args: studentFields,
  handler: async (ctx, args) => {
    const profile = await requirePermission(ctx, "students.manage");
    if (profile.role !== "admin") {
      throw new Error("Forbidden: creating students requires the admin role.");
    }
    if (args.name.length < 2 || args.name.length > 100) {
      throw new Error("Name must be 2 to 100 characters.");
    }
    if (!/^[6-9]\d{9}$/.test(args.phone)) {
      throw new Error("Phone must be a ten-digit Indian mobile number.");
    }
    if (args.courseFees < 0) throw new Error("Fees cannot be negative.");
    const now = Date.now();
    const id = await ctx.db.insert("students", { ...args, createdAt: now, updatedAt: now });
    await audit(ctx, { action: "student.create", entityType: "students", entityId: id });
    return id;
  },
});

/** Admin: convert an enquiry into a student, atomically, keeping the enquiry record. */
export const convertFromEnquiry = mutation({
  args: {
    enquiryId: v.id("enquiries"),
    courseId: v.optional(v.id("courses")),
    courseFees: v.number(),
    paymentStatus: v.union(v.literal("pending"), v.literal("partial"), v.literal("paid")),
    admissionDate: v.number(),
  },
  handler: async (ctx, { enquiryId, courseId, courseFees, paymentStatus, admissionDate }) => {
    const profile = await requirePermission(ctx, "students.manage");
    if (profile.role !== "admin") {
      throw new Error("Forbidden: converting enquiries requires the admin role.");
    }
    const enquiry = await ctx.db.get(enquiryId);
    if (!enquiry) throw new Error("Enquiry not found.");
    if (enquiry.status === "enrolled") throw new Error("This enquiry is already enrolled.");

    // guard against a duplicate conversion racing through another client
    const existing = await ctx.db
      .query("students")
      .withIndex("by_enquiry", (q) => q.eq("enquiryId", enquiryId))
      .unique();
    if (existing) throw new Error("This enquiry already became a student.");

    const now = Date.now();
    const id = await ctx.db.insert("students", {
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email,
      courseId,
      enquiryId,
      admissionDate,
      courseFees,
      paymentStatus,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(enquiryId, { status: "enrolled", updatedAt: now });
    await audit(ctx, { action: "student.convert", entityType: "students", entityId: id });
    return id;
  },
});

export const list = query({
  args: {
    status: v.optional(v.union(v.literal("active"), v.literal("completed"), v.literal("inactive"))),
    search: v.optional(v.string()),
    page: v.optional(v.number()),
    pageSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requirePermission(ctx, "students.manage");
    const page = Math.max(0, args.page ?? 0);
    const size = Math.min(50, Math.max(5, args.pageSize ?? 20));
    let rows = await ctx.db.query("students").order("desc").collect();
    if (args.status) rows = rows.filter((r) => r.status === args.status);
    if (args.search) {
      const s = args.search.toLowerCase();
      rows = rows.filter(
        (r) => r.name.toLowerCase().includes(s) || r.phone.includes(args.search!),
      );
    }
    return { rows: rows.slice(page * size, (page + 1) * size), total: rows.length, page, pageSize: size };
  },
});

export const getById = query({
  args: { id: v.id("students") },
  handler: async (ctx, { id }) => {
    await requirePermission(ctx, "students.manage");
    return await ctx.db.get(id);
  },
});

export const update = mutation({
  args: { id: v.id("students"), fields: v.object(studentFields) },
  handler: async (ctx, { id, fields }) => {
    const profile = await requirePermission(ctx, "students.manage");
    if (profile.role !== "admin" && fields.paymentStatus) {
      throw new Error("Forbidden: payment details are admin-only.");
    }
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
    await audit(ctx, { action: "student.update", entityType: "students", entityId: id });
  },
});

export const remove = mutation({
  args: { id: v.id("students") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
    await audit(ctx, { action: "student.delete", entityType: "students", entityId: id });
  },
});
