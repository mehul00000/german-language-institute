import { query } from "./_generated/server";
import { requirePermission } from "./auth";

/** Staff/admin: the numbers the dashboard opens on. */
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    await requirePermission(ctx, "enquiries.read");
    const [enquiries, students, courses] = await Promise.all([
      ctx.db.query("enquiries").collect(),
      ctx.db.query("students").collect(),
      ctx.db.query("courses").collect(),
    ]);
    const byStatus = (s: string) => enquiries.filter((e) => e.status === s).length;
    return {
      totalEnquiries: enquiries.length,
      newEnquiries: byStatus("new"),
      contactedEnquiries: byStatus("contacted"),
      followUpEnquiries: byStatus("follow_up"),
      enrolledStudents: students.length,
      activeStudents: students.filter((s) => s.status === "active").length,
      activeCourses: courses.filter((c) => c.isActive).length,
    };
  },
});

export const getRecentEnquiries = query({
  args: { count: v.number() },
  handler: async (ctx, { count }) => {
    await requirePermission(ctx, "enquiries.read");
    const rows = await ctx.db.query("enquiries").withIndex("by_createdAt").order("desc").take(count);
    return rows.map((r) => ({
      _id: r._id,
      name: r.name,
      phone: r.phone,
      interestedLevel: r.interestedLevel,
      status: r.status,
      createdAt: r.createdAt,
    }));
  },
});

/** Staff/admin: enquiries per month for the trend, over the last twelve months. */
export const getMonthlyEnquiries = query({
  args: {},
  handler: async (ctx) => {
    await requirePermission(ctx, "enquiries.read");
    const rows = await ctx.db.query("enquiries").collect();
    const months: Record<string, number> = {};
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months[`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`] = 0;
    }
    for (const r of rows) {
      const d = new Date(r.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (key in months) months[key] += 1;
    }
    return Object.entries(months).map(([month, count]) => ({ month, count }));
  },
});
