import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, audit } from "./auth";

/** Public: published testimonials only, newest first. */
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("testimonials").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    studentName: v.string(),
    courseLevel: v.string(),
    review: v.string(),
    rating: v.number(),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    if (args.rating < 1 || args.rating > 5 || !Number.isInteger(args.rating)) {
      throw new Error("Rating must be an integer from 1 to 5.");
    }
    const now = Date.now();
    const id = await ctx.db.insert("testimonials", { ...args, createdAt: now, updatedAt: now });
    await audit(ctx, { action: "testimonial.create", entityType: "testimonials", entityId: id });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("testimonials"),
    studentName: v.string(),
    courseLevel: v.string(),
    review: v.string(),
    rating: v.number(),
    isPublished: v.boolean(),
  },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx);
    if (fields.rating < 1 || fields.rating > 5) throw new Error("Rating must be 1 to 5.");
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
    await audit(ctx, { action: "testimonial.update", entityType: "testimonials", entityId: id });
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
    await audit(ctx, { action: "testimonial.delete", entityType: "testimonials", entityId: id });
  },
});
