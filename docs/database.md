# DATABASE.md

## German Language Institute – Kaithal

Database Specification Convex

Database: Convex (Document Database) Authentication: Clerk Application: Next.js + TypeScript Purpose: Manage courses, student enquiries, admissions, students, testimonials, FAQs, website settings, and administrative activity.

## 1. Database Architecture

The application will use Convex as its primary database.

### Collections (Tables)

| Collection | Purpose |
| --- | --- |
| `courses` | German language courses |
| `enquiries` | Student admission enquiries |
| `students` | Enrolled student records |
| `testimonials` | Student reviews |
| `faqs` | Frequently asked questions |
| `siteSettings` | Institute website configuration |
| `adminProfiles` | Admin and staff roles |
| `auditLogs` | Administrative activity history |

## 2. Database Relationships

adminProfiles

Clerk user ID · Role

enquiries

Student admission requests

Optional conversion

students

Enrolled students

courses

A1 – C1 programs

testimonials

Student reviews

faqs

Website questions

siteSettings

Institute configuration

auditLogs

Administrative history

## 3. Convex Schema

Create the following file:

`convex/schema.ts`

typescript

```typescript

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
      v.literal("C1")
    ),

    description: v.string(),
    duration: v.string(),
    fees: v.number(),

    curriculum: v.array(v.string()),
    eligibility: v.optional(v.string()),

    mode: v.union(
      v.literal("Online"),
      v.literal("Offline"),
      v.literal("Hybrid")
    ),

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
      v.literal("C1")
    ),

    learningMode: v.union(
      v.literal("Online"),
      v.literal("Offline"),
      v.literal("Hybrid")
    ),

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
      v.literal("closed")
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

    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("partial"),
      v.literal("paid")
    ),

    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("inactive")
    ),

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
  })
    .index("by_published", ["isPublished"]),

  // 5. Frequently Asked Questions
  faqs: defineTable({
    question: v.string(),
    answer: v.string(),

    isPublished: v.boolean(),
    order: v.number(),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_published_order", ["isPublished", "order"]),

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

    role: v.union(
      v.literal("admin"),
      v.literal("staff")
    ),

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
```

## 4. Collection Details

### 4.1 Courses

Stores all available German language programs.

Supported levels:

- A1 – Beginner
- A2 – Elementary
- B1 – Intermediate
- B2 – Upper Intermediate
- C1 – Advanced

Business rules:

- Each course must have a unique slug.
- Only active courses appear publicly.
- Admin can publish or unpublish courses.
- Fees must be non-negative.
- Course deletion must be blocked or handled safely if students are enrolled.

### 4.2 Enquiries

Stores admission requests from website visitors.

Business rules:

- Students do not need an account.
- Every enquiry starts with `new` status.
- Phone number is required.
- Internal notes must never be publicly accessible.
- Admin and authorized staff can manage enquiries.
- Duplicate enquiries should be handled carefully rather than blindly rejected.

### 4.3 Students

Stores admitted students.

Business rules:

- An enquiry can be converted into a student.
- The original enquiry ID should be retained.
- Each student can be associated with a course.
- Payment status must be tracked.
- Student data must remain private.

### 4.4 Testimonials

Stores student feedback.

Business rules:

- Only published testimonials appear on the website.
- Ratings must be between 1 and 5.
- Admin controls publishing.

### 4.5 FAQs

Stores website frequently asked questions.

Business rules:

- Only published FAQs appear publicly.
- Admin controls ordering.
- Questions and answers are editable.

### 4.6 Site Settings

Stores institute configuration.

Initial values:

| Field | Initial Value |
| --- | --- |
| Institute Name | German Language Institute |
| Phone | 08168506171 |
| Address | Kaithal, Haryana 136027 |
| WhatsApp | Verify number before activation |

### 4.7 Admin Profiles

Stores application-specific admin roles.

Business rules:

- `clerkUserId` must be unique.
- Admin accounts must be created through a trusted provisioning process.
- Only an admin can grant staff or admin permissions.
- Inactive profiles cannot access protected operations.

### 4.8 Audit Logs

Tracks important administrative activities.

Examples:

- Course created.
- Course updated.
- Enquiry status changed.
- Student admitted.
- Student record updated.
- Admin permissions changed.

Audit records should be immutable through normal application operations.

## 5. Data Access Permissions

| Collection | Public | Staff | Admin |
| --- | --- | --- | --- |
| Courses | Active only | Read | Full |
| Enquiries | Create only | Read/update | Full |
| Students | No access | Limited | Full |
| Testimonials | Published only | Read | Full |
| FAQs | Published only | Read | Full |
| Site Settings | Public fields only | Read | Full |
| Admin Profiles | No access | Own profile | Full |
| Audit Logs | No access | No access | Read |

These permissions must be enforced in Convex functions, not just in the frontend.

## 6. Important Database Operations

| Operation | Type | Access |
| --- | --- | --- |
| Get active courses | Query | Public |
| Get course by slug | Query | Public |
| Create course | Mutation | Admin |
| Update course | Mutation | Admin |
| Delete course | Mutation | Admin |
| Submit enquiry | Mutation | Public |
| Get enquiries | Query | Staff/Admin |
| Update enquiry | Mutation | Staff/Admin |
| Add enquiry note | Mutation | Staff/Admin |
| Convert enquiry to student | Mutation | Admin |
| Get students | Query | Authorized staff |
| Create student | Mutation | Admin |
| Update student | Mutation | Admin |
| Get dashboard stats | Query | Staff/Admin |
| Update site settings | Mutation | Admin |

## 7. Database Validation Rules

| Field | Validation |
| --- | --- |
| Student name | 2–100 characters |
| Phone | Valid Indian phone number |
| Email | Valid email format |
| Course fees | Number greater than or equal to zero |
| Rating | Integer between 1 and 5 |
| Course level | A1, A2, B1, B2, C1 |
| Course mode | Online, Offline, Hybrid |
| Enquiry message | Maximum 1000 characters |
| Notes | Maximum 5000 characters |
| Slug | Unique and URL-safe |

Validate these constraints in Convex mutations as well as frontend forms.

## 8. Data Integrity Requirements

1. Use Convex document IDs for relationships.
2. Use indexes for common filters and sorting.
3. Prevent duplicate course slugs.
4. Prevent duplicate student conversion from the same enquiry.
5. Preserve original enquiry records after admission.
6. Do not delete student records accidentally.
7. Use atomic Convex mutations for multi-record changes.
8. Keep audit logs for sensitive administrative changes.
9. Paginate large collections.
10. Store timestamps as Unix milliseconds using `Date.now()`.

## 9. Suggested Future Collections

These collections are not required for Version 1 but can be added later.

| Collection | Purpose |
| --- | --- |
| `batches` | Manage course batches |
| `attendance` | Track student attendance |
| `payments` | Individual payment transactions |
| `examinations` | German language tests |
| `certificates` | Certificate management |
| `notifications` | Admin notifications |

## 10. Database Folder Structure

text

```text
convex/
│
├── schema.ts
│
├── auth.ts
│
├── courses.ts
├── enquiries.ts
├── students.ts
│
├── testimonials.ts
├── faqs.ts
├── settings.ts
│
├── adminProfiles.ts
├── auditLogs.ts
│
├── dashboard.ts
│
└── _generated/
    ├── api.d.ts
    ├── dataModel.d.ts
    └── server.d.ts
```

## 11. Database Setup Commands

bash

```bash
# Install Convex
npm install convex

# Initialize Convex
npx convex dev

# Generate database API types
npx convex dev
```

Convex automatically generates types from the schema.

## 12. Database Acceptance Criteria

- [ ]All eight collections are created.
- [ ]Schema validation works.
- [ ]Required indexes are created.
- [ ]Course CRUD works.
- [ ]Public enquiry submission works.
- [ ]Enquiry status management works.
- [ ]Enquiry-to-student conversion works atomically.
- [ ]Student CRUD works.
- [ ]Testimonials and FAQs can be managed.
- [ ]Site settings can be updated.
- [ ]Clerk user roles are verified.
- [ ]Public users cannot access private records.
- [ ]Audit logs are generated for important operations.
- [ ]Database queries support pagination.

Important implementation note: Convex does not use traditional SQL tables, foreign keys, or database-level row security. Use Convex document IDs, indexes, validators, and server-side authorization. Also, the `adminProfiles` collection must be provisioned securely; a user must never be able to promote themselves to admin by modifying client-side data.

Recommended implementation order: `schema.ts` → `auth.ts` → `courses.ts` → `enquiries.ts` → `students.ts` → remaining modules.