import { QueryCtx, MutationCtx } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

/**
 * Server-side authorization helpers.
 *
 * Roles live in the `adminProfiles` table and nowhere else. A Clerk
 * identity arriving through the JWT template is mapped to a profile;
 * a user without an active profile has no rights at all, no matter
 * what the browser claims.
 *
 * Provisioning: the first admin is created once through the Convex
 * dashboard or `npx convex run` (adminProfiles.createFirst), never
 * through a public mutation.
 */

export type Role = "admin" | "staff";

export async function getProfile(ctx: QueryCtx | MutationCtx): Promise<Doc<"adminProfiles"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  const profile = await ctx.db
    .query("adminProfiles")
    .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", identity.subject))
    .unique();
  if (!profile || !profile.isActive) return null;
  return profile;
}

export async function requireStaff(ctx: QueryCtx | MutationCtx): Promise<Doc<"adminProfiles">> {
  const profile = await getProfile(ctx);
  if (!profile) throw new Error("Unauthorized: staff or admin profile required.");
  return profile;
}

export async function requireAdmin(ctx: QueryCtx | MutationCtx): Promise<Doc<"adminProfiles">> {
  const profile = await requireStaff(ctx);
  if (profile.role !== "admin") throw new Error("Forbidden: admin role required.");
  return profile;
}

/** Staff may read and update enquiries; only admins delete or manage content. */
export async function requirePermission(
  ctx: QueryCtx | MutationCtx,
  permission: "enquiries.read" | "enquiries.update" | "enquiries.delete" | "courses.manage" | "students.manage" | "content.manage" | "settings.manage" | "audit.read",
): Promise<Doc<"adminProfiles">> {
  const profile = await requireStaff(ctx);
  const adminOnly: string[] = ["enquiries.delete", "courses.manage", "content.manage", "settings.manage", "audit.read"];
  const limited = permission === "students.manage";
  if (adminOnly.includes(permission) && profile.role !== "admin") {
    throw new Error(`Forbidden: ${permission} requires the admin role.`);
  }
  if (limited && profile.role !== "admin") {
    // staff get limited student management; callers narrow fields themselves
    return profile;
  }
  return profile;
}

/** Append an immutable audit record. Never exposed through public queries. */
export async function audit(
  ctx: MutationCtx,
  entry: { action: string; entityType: string; entityId?: string; details?: string },
) {
  const profile = await getProfile(ctx);
  await ctx.db.insert("auditLogs", {
    userId: profile?.clerkUserId ?? "unknown",
    action: entry.action,
    entityType: entry.entityType,
    entityId: entry.entityId,
    details: entry.details,
    createdAt: Date.now(),
  });
}
