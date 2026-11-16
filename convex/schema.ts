import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 1. German Language Courses
  courses: defineTable({
    name: v.string(),
    slug: v.string(),
    level: v.union(
      v.literal("A1"),
      v.literal("A2"),
      v.literal("B1"),
      v.literal("B2"),
      v.literal("C1"),
    ),
    description: v.string(),
    duration: v.string(),
    fees: v.number(),
    curriculum: v.array(v.string()),
    eligibility: v.optional(v.string()),
    mode: v.union(v.literal("Online"), v.literal("Offline"), v.literal("Hybrid")),
    isActive: v.boolean(),
    isFeatured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_active", ["isActive"])
    .index("by_level", ["level"])
    .index("by_active_level", ["isActive", "level"]),

  // 2. Student Admission Enquiries
  enquiries: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    interestedLevel: v.union(
      v.literal("A1"),
      v.literal("A2"),
      v.literal("B1"),
      v.literal("B2"),
      v.literal("C1"),
    ),
    learningMode: v.union(v.literal("Online"), v.literal("Offline"), v.literal("Hybrid")),
    education: v.optional(v.string()),
    message: v.optional(v.string()),
    preferredContactTime: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("follow_up"),
      v.literal("interested"),
      v.literal("enrolled"),
      v.literal("not_interested"),
      v.literal("closed"),
    ),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_phone", ["phone"])
    .index("by_createdAt", ["createdAt"])
    .index("by_status_createdAt", ["status", "createdAt"]),

  // 3. Enrolled Students
  students: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    courseId: v.optional(v.id("courses")),
    enquiryId: v.optional(v.id("enquiries")),
    admissionDate: v.number(),
    courseFees: v.number(),
    paymentStatus: v.union(v.literal("pending"), v.literal("partial"), v.literal("paid")),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("inactive")),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_phone", ["phone"])
    .index("by_status", ["status"])
    .index("by_course", ["courseId"])
    .index("by_enquiry", ["enquiryId"]),

  // 4. Student Testimonials
  testimonials: defineTable({
    studentName: v.string(),
    courseLevel: v.string(),
    review: v.string(),
    rating: v.number(),
    isPublished: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_published", ["isPublished"]),

  // 5. Frequently Asked Questions
  faqs: defineTable({
    question: v.string(),
    answer: v.string(),
    isPublished: v.boolean(),
    order: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_published_order", ["isPublished", "order"]),

  // 6. Institute Website Settings
  siteSettings: defineTable({
    instituteName: v.string(),
    phone: v.string(),
    whatsappNumber: v.string(),
    address: v.string(),
    email: v.optional(v.string()),
    aboutText: v.optional(v.string()),
    logo: v.optional(v.string()),
    updatedAt: v.number(),
  }),

  // 7. Admin and Staff Profiles
  adminProfiles: defineTable({
    clerkUserId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("staff")),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkUserId", ["clerkUserId"])
    .index("by_role", ["role"]),

  // 8. Administrative Audit Logs
  auditLogs: defineTable({
    userId: v.string(),
    action: v.string(),
    entityType: v.string(),
    entityId: v.optional(v.string()),
    details: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_createdAt", ["createdAt"])
    .index("by_entity", ["entityType", "entityId"]),
});
