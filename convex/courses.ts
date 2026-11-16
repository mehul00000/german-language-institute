import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, audit } from "./auth";

const courseFields = {
  name: v.string(),
  slug: v.string(),
  level: v.union(v.literal("A1"), v.literal("A2"), v.literal("B1"), v.literal("B2"), v.literal("C1")),
  description: v.string(),
  duration: v.string(),
  fees: v.number(),
  curriculum: v.array(v.string()),
  eligibility: v.optional(v.string()),
  mode: v.union(v.literal("Online"), v.literal("Offline"), v.literal("Hybrid")),
  isActive: v.boolean(),
  isFeatured: v.boolean(),
};

function validateCourse(fields: {
  name: string;
  slug: string;
  fees: number;
  curriculum: string[];
}) {
  if (fields.name.length < 2 || fields.name.length > 100) {
    throw new Error("Course name must be 2 to 100 characters.");
  }
  if (!/^[a-z0-9-]+$/.test(fields.slug)) {
    throw new Error("Slug must be URL-safe: lowercase letters, digits, hyphens.");
  }
  if (fields.fees < 0) throw new Error("Fees cannot be negative.");
  if (fields.curriculum.length > 40) throw new Error("Curriculum is too long.");
}

/** Public: active courses only, newest first. */
export const listActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
  },
});

/** Public: one active course by slug. */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const course = await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!course || !course.isActive) return null;
    return course;
  },
});

/** Admin: every course, active or not. */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("courses").order("desc").collect();
  },
});

export const create = mutation({
  args: courseFields,
  handler: async (ctx, args) => {
    const profile = await requireAdmin(ctx);
    validateCourse(args);
    const existing = await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) throw new Error("A course with this slug already exists.");
    const now = Date.now();
    const id = await ctx.db.insert("courses", { ...args, createdAt: now, updatedAt: now });
    await audit(ctx, { action: "course.create", entityType: "courses", entityId: id });
    return id;
  },
});

export const update = mutation({
  args: { id: v.id("courses"), fields: v.object(courseFields) },
  handler: async (ctx, { id, fields }) => {
    await requireAdmin(ctx);
    validateCourse(fields);
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
    await audit(ctx, { action: "course.update", entityType: "courses", entityId: id });
  },
});

export const toggleStatus = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    const course = await ctx.db.get(id);
    if (!course) throw new Error("Course not found.");
    await ctx.db.patch(id, { isActive: !course.isActive, updatedAt: Date.now() });
    await audit(ctx, {
      action: course.isActive ? "course.unpublish" : "course.publish",
      entityType: "courses",
      entityId: id,
    });
  },
});

/** Admin: deletion is blocked while students are enrolled on the course. */
export const remove = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    const enrolled = await ctx.db
      .query("students")
      .withIndex("by_course", (q) => q.eq("courseId", id))
      .first();
    if (enrolled) {
      throw new Error("Students are enrolled on this course; unpublish it instead of deleting.");
    }
    await ctx.db.delete(id);
    await audit(ctx, { action: "course.delete", entityType: "courses", entityId: id });
  },
});
