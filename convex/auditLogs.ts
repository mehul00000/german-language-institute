import { query } from "./_generated/server";
import { v } from "convex/values";
import { requirePermission } from "./auth";

/** Admin only: the audit trail, newest first. Records are never mutated. */
export const list = query({
  args: { page: v.optional(v.number()), pageSize: v.optional(v.number()) },
  handler: async (ctx, args) => {
    await requirePermission(ctx, "audit.read");
    const page = Math.max(0, args.page ?? 0);
    const size = Math.min(100, Math.max(5, args.pageSize ?? 30));
    const rows = await ctx.db.query("auditLogs").withIndex("by_createdAt").order("desc").collect();
    return {
      rows: rows.slice(page * size, (page + 1) * size),
      total: rows.length,
      page,
      pageSize: size,
    };
  },
});

export const byEntity = query({
  args: { entityType: v.string(), entityId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await requirePermission(ctx, "audit.read");
    return await ctx.db
      .query("auditLogs")
      .withIndex("by_entity", (q) =>
        q.eq("entityType", args.entityType).eq("entityId", args.entityId),
      )
      .order("desc")
      .collect();
  },
});
