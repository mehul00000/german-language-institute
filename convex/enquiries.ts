import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireStaff, requireAdmin, requirePermission, audit } from "./auth";

/**
 * Public submission with abuse protection. The mutation re-validates
 * everything the form validated: the frontend check is never trusted.
 * A soft duplicate check keeps the desk honest without blocking a
 * genuine second enquiry.
 */
export const create = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    interestedLevel: v.union(v.literal("A1"), v.literal("A2"), v.literal("B1"), v.literal("B2"), v.literal("C1")),
    learningMode: v.union(v.literal("Online"), v.literal("Offline"), v.literal("Hybrid")),
    education: v.optional(v.string()),
    message: v.optional(v.string()),
    preferredContactTime: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.name.length < 2 || args.name.length > 100) {
      throw new Error("Name must be 2 to 100 characters.");
    }
    if (!/^[6-9]\d{9}$/.test(args.phone)) {
      throw new Error("Phone must be a ten-digit Indian mobile number.");
    }
    if (args.email && !args.email.includes("@")) {
      throw new Error("Email does not look valid.");
    }
    if (args.message && args.message.length > 1000) {
      throw new Error("Message is too long.");
    }

    // Soft duplicate check: same phone inside ten minutes is refused.
    const recent = await ctx.db
      .query("enquiries")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .order("desc")
      .first();
    if (recent && Date.now() - recent.createdAt < 10 * 60 * 1000) {
      throw new Error("An enquiry with this number was just submitted.");
    }

    const now = Date.now();
    return await ctx.db.insert("enquiries", { ...args, status: "new", createdAt: now, updatedAt: now });
  },
});

/** Staff/admin: paginated list with optional filters, newest first. */
export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("contacted"),
        v.literal("follow_up"),
        v.literal("interested"),
        v.literal("enrolled"),
        v.literal("not_interested"),
        v.literal("closed"),
      ),
    ),
    level: v.optional(v.union(v.literal("A1"), v.literal("A2"), v.literal("B1"), v.literal("B2"), v.literal("C1"))),
    search: v.optional(v.string()),
    page: v.optional(v.number()),
    pageSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requirePermission(ctx, "enquiries.read");
    const page = Math.max(0, args.page ?? 0);
    const size = Math.min(50, Math.max(5, args.pageSize ?? 20));
    let rows = await ctx.db.query("enquiries").withIndex("by_createdAt").order("desc").collect();
    if (args.status) rows = rows.filter((r) => r.status === args.status);
    if (args.level) rows = rows.filter((r) => r.interestedLevel === args.level);
    if (args.search) {
      const s = args.search.toLowerCase();
      rows = rows.filter(
        (r) => r.name.toLowerCase().includes(s) || r.phone.includes(args.search!),
      );
    }
    return {
      rows: rows.slice(page * size, (page + 1) * size),
      total: rows.length,
      page,
      pageSize: size,
    };
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("enquiries"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("follow_up"),
      v.literal("interested"),
      v.literal("enrolled"),
      v.literal("not_interested"),
      v.literal("closed"),
    ),
  },
  handler: async (ctx, { id, status }) => {
    await requirePermission(ctx, "enquiries.update");
    await ctx.db.patch(id, { status, updatedAt: Date.now() });
    await audit(ctx, { action: "enquiry.status", entityType: "enquiries", entityId: id, details: status });
  },
});

export const addNote = mutation({
  args: { id: v.id("enquiries"), note: v.string() },
  handler: async (ctx, { id, note }) => {
    await requirePermission(ctx, "enquiries.update");
    if (note.length > 5000) throw new Error("Note is too long.");
    await ctx.db.patch(id, { notes: note, updatedAt: Date.now() });
    await audit(ctx, { action: "enquiry.note", entityType: "enquiries", entityId: id });
  },
});

export const remove = mutation({
  args: { id: v.id("enquiries") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
    await audit(ctx, { action: "enquiry.delete", entityType: "enquiries", entityId: id });
  },
});

/** Staff/admin: rows shaped for CSV export (no internal notes). */
export const exportData = query({
  args: {},
  handler: async (ctx) => {
    await requirePermission(ctx, "enquiries.read");
    const rows = await ctx.db.query("enquiries").withIndex("by_createdAt").order("desc").collect();
    return rows.map((r) => ({
      name: r.name,
      phone: r.phone,
      email: r.email ?? "",
      level: r.interestedLevel,
      mode: r.learningMode,
      status: r.status,
      createdAt: new Date(r.createdAt).toISOString(),
    }));
  },
});
