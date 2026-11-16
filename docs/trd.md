# Technical Requirements Document (TRD)

## German Language Institute – Kaithal

Technical SpecificationNext.js + Convex + Clerk

## 1. Project Overview

Project: German Language Institute – Kaithal Website and Admin Management System

Objective: Develop a full-stack web application that allows students to explore German language courses, submit admission enquiries, and contact the institute. The institute administrator will manage courses, enquiries, students, testimonials, FAQs, and website content through a secure dashboard.

### Business Details

- Business: German Language Institute
- Address: Galli No. 2, Kaithal–Pundri–Karnal Road, Near Sector 18, Balaji Colony, Balraj Nagar, Kaithal, Haryana 136027
- Contact: 08168506171

## 2. Technology Requirements

| Technology | Version / Requirement | Purpose |
| --- | --- | --- |
| Next.js | Latest stable, App Router | Frontend and application server |
| React | Compatible with Next.js | UI components |
| TypeScript | Strict mode | Type safety |
| Tailwind CSS | Latest stable | CSS framework |
| Convex | Latest stable | Backend and database |
| Clerk | Latest stable SDK | Authentication |
| Zod | Latest stable | Validation |
| React Hook Form | Latest stable | Form management |
| Vercel | Production deployment | Hosting |
| Resend | Optional | Email notifications |

Use compatible stable package versions and commit the package lockfile.

## 3. System Architecture

Frontend – Next.js App Router

Public website · Admin dashboard · Forms

Clerk

Authentication and roles

Convex

Queries, mutations and database

Convex Database

Courses · Enquiries · Students · Settings · FAQs

### Architecture Rules

1. Next.js App Router must be used.
2. Use Server Components by default.
3. Use Client Components only for interactive functionality.
4. Convex handles all persistent application data.
5. Clerk handles user authentication.
6. Convex functions must verify authorization for protected operations.
7. Public enquiry submissions must not require authentication.
8. Admin-only data must never be exposed through public queries.

## 4. Application Routes

### Public Routes

| Route | Functionality |
| --- | --- |
| `/` | Homepage |
| `/about` | Institute information |
| `/courses` | All courses |
| `/courses/[slug]` | Course details |
| `/german-levels` | German language levels |
| `/admission` | Admission enquiry |
| `/contact` | Contact information |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms and conditions |

### Authentication Routes

| Route | Functionality |
| --- | --- |
| `/sign-in` | Clerk login |
| `/sign-up` | Disabled for public registration or restricted to authorized staff invitation |

### Admin Routes

| Route | Functionality |
| --- | --- |
| `/admin` | Dashboard |
| `/admin/enquiries` | Enquiry management |
| `/admin/enquiries/[id]` | Enquiry details |
| `/admin/students` | Student management |
| `/admin/students/[id]` | Student details |
| `/admin/courses` | Course management |
| `/admin/testimonials` | Testimonials |
| `/admin/faqs` | FAQ management |
| `/admin/settings` | Website settings |

## 5. Database Technical Specifications

Use Convex schema validation and indexed queries.

### 5.1 Courses Table

ts

```ts
courses: defineTable({
  name: v.string(),
  slug: v.string(),
  level: v.string(),
  description: v.string(),
  duration: v.string(),
  fees: v.number(),
  curriculum: v.array(v.string()),
  eligibility: v.optional(v.string()),
  mode: v.string(),
  isActive: v.boolean(),
  isFeatured: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_slug", ["slug"])
.index("by_active", ["isActive"])
```

### 5.2 Enquiries Table

ts

```ts
enquiries: defineTable({
  name: v.string(),
  phone: v.string(),
  email: v.optional(v.string()),
  interestedLevel: v.string(),
  learningMode: v.string(),
  education: v.optional(v.string()),
  message: v.optional(v.string()),
  preferredContactTime: v.optional(v.string()),
  status: v.string(),
  notes: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_status", ["status"])
.index("by_phone", ["phone"])
.index("by_createdAt", ["createdAt"])
```

### 5.3 Students Table

ts

```ts
students: defineTable({
  name: v.string(),
  phone: v.string(),
  email: v.optional(v.string()),
  courseId: v.optional(v.id("courses")),
  enquiryId: v.optional(v.id("enquiries")),
  admissionDate: v.number(),
  courseFees: v.number(),
  paymentStatus: v.string(),
  status: v.string(),
  notes: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_phone", ["phone"])
.index("by_status", ["status"])
```

### 5.4 Testimonials Table

ts

```ts
testimonials: defineTable({
  studentName: v.string(),
  courseLevel: v.string(),
  review: v.string(),
  rating: v.number(),
  isPublished: v.boolean(),
  createdAt: v.number(),
})
.index("by_published", ["isPublished"])
```

### 5.5 FAQs Table

ts

```ts
faqs: defineTable({
  question: v.string(),
  answer: v.string(),
  isPublished: v.boolean(),
  order: v.number(),
})
.index("by_published_order", ["isPublished", "order"])
```

### 5.6 Site Settings Table

ts

```ts
siteSettings: defineTable({
  instituteName: v.string(),
  phone: v.string(),
  whatsappNumber: v.string(),
  address: v.string(),
  email: v.optional(v.string()),
  aboutText: v.optional(v.string()),
  updatedAt: v.number(),
})
```

### 5.7 Admin Audit Logs Table

ts

```ts
auditLogs: defineTable({
  userId: v.string(),
  action: v.string(),
  entityType: v.string(),
  entityId: v.optional(v.string()),
  createdAt: v.number(),
})
.index("by_user", ["userId"])
.index("by_createdAt", ["createdAt"])
```

Audit records should be created for important administrative operations, such as course deletion, student updates, and enquiry status changes.

## 6. Convex Backend Requirements

Backend code must be divided into separate modules.

| File | Functionality |
| --- | --- |
| `schema.ts` | Database definitions |
| `auth.ts` | Authorization helpers |
| `courses.ts` | Course queries and mutations |
| `enquiries.ts` | Enquiry management |
| `students.ts` | Student management |
| `testimonials.ts` | Review management |
| `faqs.ts` | FAQ management |
| `settings.ts` | Institute settings |
| `dashboard.ts` | Dashboard statistics |
| `auditLogs.ts` | Administrative activity |

### Function Naming Convention

Courses

- `courses.list`
- `courses.getBySlug`
- `courses.create`
- `courses.update`
- `courses.remove`
- `courses.toggleStatus`

Enquiries

- `enquiries.create`
- `enquiries.list`
- `enquiries.getById`
- `enquiries.updateStatus`
- `enquiries.addNote`
- `enquiries.remove`
- `enquiries.exportData`

Students

- `students.create`
- `students.list`
- `students.getById`
- `students.update`
- `students.remove`
- `students.convertFromEnquiry`

Dashboard

- `dashboard.getStats`
- `dashboard.getRecentEnquiries`
- `dashboard.getMonthlyEnquiries`

All operations must use Convex's `query`, `mutation`, or `action` appropriately. Names above describe logical operations, not literal API endpoint URLs.

## 7. Clerk Authentication Requirements

### Authentication Flow

1. Admin opens `/sign-in`.
2. Clerk authenticates the user.
3. Next.js checks the authenticated session.
4. Server verifies the user's authorized role.
5. Authorized user accesses `/admin`.
6. Convex independently verifies the user's identity and permissions.

### Role Management

ts

```ts
type UserRole = "admin" | "staff";
```

| Permission | Admin | Staff |
| --- | --- | --- |
| Dashboard | Yes | Yes |
| View enquiries | Yes | Yes |
| Update enquiries | Yes | Yes |
| Delete enquiries | Yes | No |
| Manage courses | Yes | No |
| Manage students | Yes | Limited |
| Manage website content | Yes | No |
| View audit logs | Yes | No |

### Security Requirements

- Use Clerk JWT templates configured for Convex.
- Configure Convex authentication using Clerk's JWT issuer.
- Use `auth.getUserIdentity()` in protected Convex functions.
- Verify roles using trusted server-side identity or securely maintained authorization records.
- Never trust role information submitted by the browser.
- Restrict staff account creation to administrators.
- Do not expose admin sign-up publicly.

## 8. Frontend Technical Requirements

### Components

Create reusable components for:

- Navigation.
- Footer.
- Course cards.
- Course detail sections.
- Enquiry forms.
- Contact information.
- Testimonials.
- FAQs.
- Admin navigation.
- Dashboard statistics.
- Data tables.
- Search and filters.
- Pagination.
- Confirmation dialogs.
- Form validation and error states.

### Form Validation

Use Zod for validation.

Example:

ts

```ts
import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[0-9]{10}$/),
  email: z.string().email().optional().or(z.literal("")),
  interestedLevel: z.enum([
    "A1", "A2", "B1", "B2", "C1"
  ]),
  learningMode: z.enum([
    "Online", "Offline", "Hybrid"
  ]),
  message: z.string().max(1000).optional(),
});
```

The backend must independently validate the same constraints using Convex validators. Frontend validation alone is insufficient.

## 9. Admin Dashboard Functional Requirements

### Dashboard

The dashboard must retrieve statistics directly from Convex.

Required statistics:

- Total enquiries.
- New enquiries.
- Follow-up enquiries.
- Enrolled students.
- Active courses.
- Monthly enquiry trends.

### Enquiry Management

Required functionality:

- Server-side pagination.
- Search by name and phone.
- Filter by status.
- Filter by course level.
- Update enquiry status.
- Add internal notes.
- Convert enquiry to student.
- Export CSV.

### Student Management

Required functionality:

- Create student.
- Edit student.
- Assign course.
- Track fees.
- Track payment status.
- Track admission date.
- Change student status.

### Course Management

Required functionality:

- Create course.
- Edit course.
- Delete course.
- Publish/unpublish course.
- Update fees.
- Manage curriculum.
- Manage duration.

## 10. API and Data Flow Requirements

Convex is the primary backend. Do not create unnecessary REST APIs for operations already supported by Convex.

| Operation | Method | Authentication |
| --- | --- | --- |
| List active courses | Convex Query | Public |
| Get course details | Convex Query | Public |
| Submit enquiry | Convex Mutation | Public with abuse protection |
| List enquiries | Convex Query | Admin/staff |
| Update enquiry | Convex Mutation | Admin/staff |
| Create student | Convex Mutation | Admin |
| List students | Convex Query | Authorized staff |
| Update courses | Convex Mutation | Admin |
| Update settings | Convex Mutation | Admin |
| Dashboard statistics | Convex Query | Admin/staff |

## 11. Security Requirements

Security is a mandatory development requirement.

1. All protected database functions must perform authorization checks.
2. Public enquiry forms must have rate limiting.
3. Implement bot/spam protection.
4. Validate all user input on the backend.
5. Sanitize any user-generated content rendered as HTML.
6. Never expose student information publicly.
7. Protect internal notes and audit records.
8. Use environment variables for credentials.
9. Implement secure error handling.
10. Avoid logging personal student information.
11. Apply least-privilege permissions.
12. Add database indexes for frequently queried fields.

Important: A protected Next.js route is not sufficient security. Authorization must also be enforced inside Convex functions.

## 12. Performance Requirements

| Area | Requirement |
| --- | --- |
| Initial page load | Optimize for fast loading |
| Images | Next.js Image optimization |
| Public pages | Server-side rendering or static rendering where appropriate |
| Course listing | Convex indexed queries |
| Admin tables | Pagination |
| Dashboard | Efficient aggregate/statistical queries |
| Forms | Loading and error states |
| Mobile | Responsive functionality |
| SEO | Metadata and structured data |

Avoid downloading all enquiries or students to the browser just to perform filtering.

## 13. SEO and Local Search Requirements

Implement:

- Dynamic metadata.
- Page-specific title and description.
- Sitemap XML.
- Robots.txt.
- Canonical URLs.
- Open Graph metadata.
- Educational organization structured data.
- Local SEO keywords.

Target search terms:

- German language institute in Kaithal.
- German classes in Kaithal.
- German A1 course in Kaithal.
- German B1 classes in Haryana.
- German language coaching near Kaithal.

Do not publish unverified claims about certifications, affiliations, or placement guarantees.

## 14. Environment Configuration

`.env.local`

env

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CONVEX_URL=

CLERK_JWT_ISSUER_DOMAIN=

NEXT_PUBLIC_SITE_URL=

RESEND_API_KEY=
```

Convex environment variables should be configured separately through Convex deployment settings when required.

Never commit secret keys to GitHub.

## 15. Recommended Project Structure

text

```text
german-language-institute/
│
├── convex/
│   ├── schema.ts
│   ├── auth.ts
│   ├── courses.ts
│   ├── enquiries.ts
│   ├── students.ts
│   ├── testimonials.ts
│   ├── faqs.ts
│   ├── settings.ts
│   ├── dashboard.ts
│   └── auditLogs.ts
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   ├── courses/
│   │   │   ├── german-levels/
│   │   │   ├── admission/
│   │   │   └── contact/
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── enquiries/
│   │   │   ├── students/
│   │   │   ├── courses/
│   │   │   ├── testimonials/
│   │   │   ├── faqs/
│   │   │   └── settings/
│   │   │
│   │   ├── sign-in/
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── public/
│   │   ├── admin/
│   │   ├── forms/
│   │   └── shared/
│   │
│   ├── providers/
│   │   ├── clerk-provider.tsx
│   │   └── convex-provider.tsx
│   │
│   ├── lib/
│   │   ├── validations/
│   │   ├── constants/
│   │   └── utils/
│   │
│   └── types/
│
├── public/
├── middleware.ts
├── package.json
├── tsconfig.json
└── .env.local
```

## 16. Testing Requirements

### Unit Testing

- Enquiry validation.
- Course validation.
- Student validation.
- Authorization helpers.
- Status transitions.

### Integration Testing

- Clerk authentication with Convex.
- Enquiry submission and retrieval.
- Course CRUD.
- Student creation.
- Enquiry-to-student conversion.
- Admin authorization.

### End-to-End Testing

- Public user visits website.
- Public user submits enquiry.
- Admin signs in.
- Admin views enquiry.
- Admin updates enquiry status.
- Admin converts enquiry to student.
- Unauthorized user attempts to access admin features.

## 17. Deployment Requirements

### Development

- Local Next.js development server.
- Convex development deployment.
- Clerk development instance.

### Production

- Deploy Next.js to Vercel.
- Configure production Convex deployment.
- Configure Clerk production instance.
- Configure production environment variables.
- Configure domain and HTTPS.
- Verify production authentication.
- Test public forms.
- Test protected admin operations.
- Configure email notifications if enabled.

## 18. Non-Functional Requirements

| Category | Requirement |
| --- | --- |
| Scalability | Support growing enquiries and student records |
| Maintainability | Modular frontend and backend |
| Reliability | Proper error handling |
| Security | Server-side authorization |
| Accessibility | Semantic HTML and keyboard support |
| Compatibility | Modern browsers |
| Data integrity | Validated relationships and controlled mutations |
| Availability | Production hosting with monitoring |

## 19. Out of Scope – Version 1

The following are not part of the initial release:

- Student login portal.
- Online payment processing.
- Online German examinations.
- Automatic certificate generation.
- Attendance tracking.
- Live classes.
- Mobile applications.
- Multi-branch management.

These can be introduced in Version 2.

## 20. Final Development Checklist

Implementation progress

# 0%

Project setup

[ ]Initialize Next.js with TypeScript and App Router

[ ]Configure Tailwind CSS

[ ]Connect Convex

[ ]Integrate Clerk

[ ]Configure environment variables

Backend

[ ]Create Convex schema

[ ]Implement authentication helpers

[ ]Implement course functions

[ ]Implement enquiry functions

[ ]Implement student functions

[ ]Implement dashboard functions

[ ]Implement audit logging

Public website

[ ]Build public routes

[ ]Implement dynamic course listing

[ ]Implement course details

[ ]Implement admission enquiry form

[ ]Implement contact and WhatsApp links

[ ]Implement SEO

Admin dashboard

[ ]Implement Clerk-protected admin access

[ ]Implement role permissions

[ ]Build dashboard statistics

[ ]Build enquiry management

[ ]Build student management

[ ]Build course management

[ ]Build website settings

Testing and deployment

[ ]Unit and integration tests

[ ]End-to-end tests

[ ]Security checks

[ ]Mobile responsiveness checks

[ ]Deploy to Vercel

[ ]Configure production Convex and Clerk

Reset checklist

## 21\. Final Technical Decision

The application must follow this architecture:

- Next.js: Frontend, routing and application rendering.
- Clerk: Secure login and identity management.
- Convex: Database, backend functions and real-time updates.
- Vercel: Production deployment.
- Resend: Optional email notifications.

Version 1 deliverable: A complete public website, admission enquiry management system, and secure admin dashboard.

The implementation must prioritize maintainability, security, data validation, and future extensibility rather than unnecessary complexity.