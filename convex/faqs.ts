import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, audit } from "./auth";

/** Public: published FAQs in order. */
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("faqs")
      .withIndex("by_published_order", (q) => q.eq("isPublished", true))
      .order("asc")
      .collect();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("faqs").withIndex("by_published_order").order("asc").collect();
  },
});

export const create = mutation({
  args: {
    question: v.string(),
    answer: v.string(),
    isPublished: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    if (args.question.length < 2) throw new Error("Question is too short.");
    const now = Date.now();
    const id = await ctx.db.insert("faqs", { ...args, createdAt: now, updatedAt: now });
    await audit(ctx, { action: "faq.create", entityType: "faqs", entityId: id });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("faqs"),
    question: v.string(),
    answer: v.string(),
    isPublished: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
    await audit(ctx, { action: "faq.update", entityType: "faqs", entityId: id });
  },
});

export const remove = mutation({
  args: { id: v.id("faqs") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
    await audit(ctx, { action: "faq.delete", entityType: "faqs", entityId: id });
  },
});
