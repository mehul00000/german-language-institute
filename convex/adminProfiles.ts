import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, getProfile, audit } from "./auth";

/**
 * Provisioning of admin and staff profiles.
 *
 * There is no public path to a profile. The FIRST profile is created
 * once from a trusted context (Convex dashboard or `npx convex run
 * adminProfiles:provisionFirst '{"clerkUserId": "..."}'`) by the
 * institute owner; every later profile is granted by an existing
 * admin through this module.
 */

export const provisionFirst = mutation({
  args: {
    clerkUserId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("adminProfiles")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    if (existing) return existing._id;
    const anyProfile = await ctx.db.query("adminProfiles").first();
    if (anyProfile) {
      // once provisioned, only admins grant profiles
      await requireAdmin(ctx);
    }
    const now = Date.now();
    const id = await ctx.db.insert("adminProfiles", {
      ...args,
      role: "admin",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    await audit(ctx, { action: "adminProfile.provision", entityType: "adminProfiles", entityId: id });
    return id;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("adminProfiles").order("desc").collect();
  },
});

export const me = query({
  args: {},
  handler: async (ctx) => {
    return await getProfile(ctx);
  },
});

export const grant = mutation({
  args: {
    clerkUserId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("staff")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db
      .query("adminProfiles")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
      .unique();
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, isActive: true, updatedAt: now });
      await audit(ctx, { action: "adminProfile.update", entityType: "adminProfiles", entityId: existing._id });
      return existing._id;
    }
    const id = await ctx.db.insert("adminProfiles", {
      ...args,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    await audit(ctx, { action: "adminProfile.grant", entityType: "adminProfiles", entityId: id });
    return id;
  },
});

export const setActive = mutation({
  args: { id: v.id("adminProfiles"), isActive: v.boolean() },
  handler: async (ctx, { id, isActive }) => {
    const actor = await requireAdmin(ctx);
    const target = await ctx.db.get(id);
    if (!target) throw new Error("Profile not found.");
    if (target.clerkUserId === actor.clerkUserId && !isActive) {
      throw new Error("An admin cannot deactivate their own profile.");
    }
    await ctx.db.patch(id, { isActive, updatedAt: Date.now() });
    await audit(ctx, {
      action: isActive ? "adminProfile.activate" : "adminProfile.deactivate",
      entityType: "adminProfiles",
      entityId: id,
    });
  },
});
