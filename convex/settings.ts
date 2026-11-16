import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, audit } from "./auth";

/** Public: the institute's published settings (contact fields only). */
export const getPublic = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("siteSettings").first();
    if (!settings) return null;
    return {
      instituteName: settings.instituteName,
      phone: settings.phone,
      whatsappNumber: settings.whatsappNumber,
      address: settings.address,
      email: settings.email,
      aboutText: settings.aboutText,
    };
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("siteSettings").first();
  },
});

export const update = mutation({
  args: {
    instituteName: v.string(),
    phone: v.string(),
    whatsappNumber: v.string(),
    address: v.string(),
    email: v.optional(v.string()),
    aboutText: v.optional(v.string()),
    logo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    if (args.instituteName.length < 2) throw new Error("Institute name is too short.");
    if (!/^[0-9+ ]{8,15}$/.test(args.phone)) throw new Error("Phone does not look valid.");
    const existing = await ctx.db.query("siteSettings").first();
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: now });
      await audit(ctx, { action: "settings.update", entityType: "siteSettings", entityId: existing._id });
      return existing._id;
    }
    const id = await ctx.db.insert("siteSettings", { ...args, updatedAt: now });
    await audit(ctx, { action: "settings.create", entityType: "siteSettings", entityId: id });
    return id;
  },
});
