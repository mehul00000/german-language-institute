# Product Requirements Document (PRD)

## German Language Institute – Kaithal

Development ReadyNext.js + Convex + Clerk

## 1. Project Overview

Project Name: German Language Institute – Kaithal

Business Type: German Language Training Institute

Objective: Build a professional, functional website for a German language institute in Kaithal, Haryana, where students can explore German courses, understand course levels, submit admission enquiries, book demo classes, and connect with the institute.

The website must also include a secure admin dashboard where institute staff can manage courses, enquiries, student information, and website content.

Primary Goal: Generate student enquiries and convert visitors into enrolled students.

## 2. Business Information

| Field | Details |
| --- | --- |
| Business Name | German Language Institute |
| Address | Galli No. 2, Kaithal–Pundri–Karnal Road, Near Sector 18, Balaji Colony, Balraj Nagar, Kaithal, Haryana 136027 |
| Contact Number | 08168506171 |
| Country | India |
| Primary Language | English |
| Target Audience | Students, job seekers, professionals, and people planning to study or work in Germany |

## 3. Technology Stack

| Technology | Purpose |
| --- | --- |
| Next.js (App Router) | Frontend and server-side application |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Convex | Backend, database, queries, and mutations |
| Clerk | Authentication and user management |
| React Hook Form | Form handling |
| Zod | Form validation |
| Vercel | Deployment |
| Resend (optional) | Email notifications |

### Architecture

- Next.js handles all public pages and admin dashboard pages.
- Clerk manages authentication and admin access.
- Convex stores and manages application data.
- Convex mutations handle form submissions and admin operations.
- Convex queries provide real-time data to the admin dashboard.
- Clerk user IDs are used to associate administrative records with authenticated users.

## 4. Website Modules

### 4.1 Public Website

The website should contain the following pages:

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Institute introduction and enquiry generation |
| About Us | `/about` | Institute information and teaching approach |
| Courses | `/courses` | Available German language courses |
| Course Details | `/courses/[slug]` | Detailed course information |
| German Levels | `/german-levels` | A1, A2, B1, B2 and C1 information |
| Contact | `/contact` | Contact details and location |
| Admission Enquiry | `/admission` | Student admission form |
| Privacy Policy | `/privacy-policy` | Privacy information |
| Terms & Conditions | `/terms` | Website terms |

### 4.2 Homepage Requirements

The homepage must communicate:

- Institute introduction.
- German language training information.
- Available course levels.
- Why students should learn German.
- Benefits of learning German.
- Teaching methodology.
- Student testimonials (admin-managed).
- Frequently asked questions.
- Admission enquiry form.
- Contact information.
- WhatsApp contact option.

All institute-specific content should be manageable through the admin dashboard.

### 4.3 Courses Management

Initially support these German language levels:

- A1 – Beginner
- A2 – Elementary
- B1 – Intermediate
- B2 – Upper Intermediate
- C1 – Advanced

Each course should contain:

| Field | Type |
| --- | --- |
| Course Name | String |
| Slug | String |
| German Level | String |
| Description | String |
| Duration | String |
| Fees | Number |
| Course Curriculum | Array |
| Eligibility | String |
| Mode | Online / Offline / Hybrid |
| Status | Active / Inactive |
| Featured | Boolean |

Admin should be able to:

- Create courses.
- Update courses.
- Delete courses.
- Publish or unpublish courses.
- Change course fees.
- Manage course descriptions.
- Manage curriculum and duration.

Important: Course prices and duration should not be hardcoded on the frontend.

## 5. Admission Enquiry System

This is one of the most important features.

Students should be able to submit an enquiry without creating an account.

### Enquiry Form Fields

| Field | Required |
| --- | --- |
| Student Name | Yes |
| Phone Number | Yes |
| Email Address | No |
| Interested German Level | Yes |
| Learning Mode | Yes |
| Current Education | No |
| Message | No |
| Preferred Contact Time | No |

### Enquiry Functionality

- Validate all submitted information.
- Store enquiries in Convex.
- Generate a unique enquiry ID.
- Record submission date and time.
- Prevent duplicate submissions where practical.
- Show a successful submission confirmation.
- Allow students to contact the institute through WhatsApp.
- Notify the admin of new enquiries.

### Enquiry Status

- New
- Contacted
- Follow-up
- Interested
- Enrolled
- Not Interested
- Closed

Admin should be able to update the status and add internal notes.

## 6. Admin Dashboard

Route: `/admin`

Only authorized institute administrators should have access.

### Admin Dashboard Modules

| Module | Features |
| --- | --- |
| Dashboard | Overview and statistics |
| Enquiries | View and manage enquiries |
| Students | Manage enrolled students |
| Courses | Create, edit, delete courses |
| Testimonials | Manage student reviews |
| FAQs | Manage frequently asked questions |
| Website Content | Update public website information |
| Contact Details | Update phone, address and WhatsApp |
| Settings | Manage institute settings |

### 6.1 Dashboard Statistics

Display:

- Total enquiries.
- New enquiries.
- Contacted enquiries.
- Total enrolled students.
- Active courses.
- Recent enquiries.
- Monthly enquiry statistics.

### 6.2 Enquiry Management

Admin should be able to:

- View all enquiries.
- Search by student name or phone number.
- Filter by course level.
- Filter by enquiry status.
- Filter by submission date.
- Open individual enquiry details.
- Update enquiry status.
- Add internal notes.
- Delete enquiries.
- Export enquiries to CSV.

### 6.3 Student Management

Admin should be able to:

- Add students manually.
- Convert an enquiry into a student.
- Edit student details.
- Assign a German language level.
- Record admission date.
- Record course fees.
- Track payment status.
- Add student notes.
- Mark students as active or inactive.

## 7. Authentication – Clerk

Use Clerk for authentication.

### Requirements

- Admin login using email/password or supported Clerk sign-in methods.
- Secure admin routes.
- Logout functionality.
- Session management.
- Protected admin layouts.
- Unauthorized users must not access admin functionality.

### Admin Authorization

Do not allow every authenticated Clerk user to access the dashboard.

Use Clerk public/private metadata or an equivalent trusted authorization mechanism to identify admin users.

Example roles:

ts

```ts
type UserRole = "admin" | "staff";
```

Permissions:

| Permission | Admin | Staff |
| --- | --- | --- |
| View Dashboard | Yes | Yes |
| View Enquiries | Yes | Yes |
| Manage Enquiries | Yes | Yes |
| Manage Courses | Yes | No |
| Manage Students | Yes | Limited |
| Manage Website Content | Yes | No |
| Manage Admin Users | Yes | No |

Important security requirements:

- Verify authentication on the server.
- Verify roles on the server and in Convex mutations and queries.
- Never trust client-side role checks.
- Do not expose Convex admin operations to unauthenticated users.
- Use Clerk JWT integration with Convex.

## 8. Convex Database Schema

Suggested database structure:

### Table: `courses`

ts

```ts
{
  name: string,
  slug: string,
  level: string,
  description: string,
  duration: string,
  fees: number,
  curriculum: string[],
  eligibility: string,
  mode: string,
  isActive: boolean,
  isFeatured: boolean,
  createdAt: number,
  updatedAt: number
}
```

### Table: `enquiries`

ts

```ts
{
  name: string,
  phone: string,
  email?: string,
  interestedLevel: string,
  learningMode: string,
  education?: string,
  message?: string,
  preferredContactTime?: string,
  status: string,
  notes?: string,
  createdAt: number,
  updatedAt: number
}
```

### Table: `students`

ts

```ts
{
  name: string,
  phone: string,
  email?: string,
  courseId?: Id<"courses">,
  enquiryId?: Id<"enquiries">,
  admissionDate: number,
  courseFees: number,
  paymentStatus: string,
  status: string,
  notes?: string,
  createdAt: number
}
```

### Table: `testimonials`

ts

```ts
{
  studentName: string,
  courseLevel: string,
  review: string,
  rating: number,
  isPublished: boolean,
  createdAt: number
}
```

### Table: `faqs`

ts

```ts
{
  question: string,
  answer: string,
  isPublished: boolean,
  order: number
}
```

### Table: `siteSettings`

ts

```ts
{
  instituteName: string,
  phone: string,
  whatsappNumber: string,
  address: string,
  email?: string,
  aboutText?: string,
  updatedAt: number
}
```

## 9. Convex Backend Functions

Organize backend functions by module.

| File | Responsibilities |
| --- | --- |
| `courses.ts` | Course CRUD, listing and details |
| `enquiries.ts` | Enquiry submission and management |
| `students.ts` | Student CRUD and enrollment |
| `testimonials.ts` | Testimonial management |
| `faqs.ts` | FAQ management |
| `settings.ts` | Institute settings |
| `dashboard.ts` | Statistics and reports |
| `auth.ts` | Admin authorization helpers |

### Function Types

- Queries: Fetch courses, enquiries, students and statistics.
- Mutations: Create, update and delete records.
- Actions: External integrations such as email notifications.

All database operations must include server-side validation and authorization.

## 10. Additional Functional Requirements

### WhatsApp Integration

Use the institute's phone number for WhatsApp contact, after verifying that the number is WhatsApp-enabled.

Provide:

- Direct WhatsApp contact.
- Pre-filled enquiry message.
- WhatsApp contact from course detail pages.

### SEO

Implement:

- Dynamic page titles and descriptions.
- Open Graph metadata.
- Canonical URLs.
- Sitemap.
- Robots.txt.
- Local SEO targeting Kaithal, Haryana.
- Structured data for the educational organization.
- Course-specific metadata.

### Performance

- Server Components by default.
- Client Components only when required.
- Image optimization through Next.js Image.
- Lazy loading for appropriate content.
- Pagination for large enquiry lists.
- Efficient Convex queries and indexes.

### Responsive Functionality

The website must work on:

- Mobile phones.
- Tablets.
- Desktop computers.

## 11. Suggested Project Structure

text

```text
german-institute/
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
│   └── dashboard.ts
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   ├── courses/
│   │   │   ├── german-levels/
│   │   │   ├── contact/
│   │   │   ├── admission/
│   │   │   └── privacy-policy/
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
│   │   ├── sign-up/
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   └── types/
│
├── public/
├── middleware.ts
├── package.json
└── .env.local
```

## 12. Environment Variables

env

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOYMENT=

CLERK_JWT_ISSUER_DOMAIN=

RESEND_API_KEY=
```

Do not expose secret keys through client-side code or commit `.env.local` to Git.

## 13. User Workflows

### Student Admission Workflow

1. Student visits the website.
2. Student explores German language courses.
3. Student selects a course level.
4. Student submits admission enquiry.
5. Convex stores the enquiry.
6. Admin receives notification and contacts student.
7. Admin converts the enquiry into an enrolled student.

### Admin Workflow

1. Admin signs in through Clerk.
2. System verifies admin authorization.
3. Admin opens dashboard.
4. Admin reviews new enquiries.
5. Admin contacts students and updates statuses.
6. Admin manages courses, students and website content.

## 14. Security and Data Protection

- Clerk authentication for admin accounts.
- Role-based access control.
- Convex-side authorization.
- Zod or Convex validators for incoming data.
- Rate limiting on public enquiry submissions.
- Spam protection on public forms.
- Input sanitization.
- Secure environment variables.
- No public access to student records.
- No public access to internal enquiry notes.
- Audit important administrative actions.
- Avoid storing unnecessary sensitive student information.

## 15. Development Phases

| Phase | Deliverables |
| --- | --- |
| Phase 1 | Next.js setup, TypeScript, Convex and Clerk integration |
| Phase 2 | Database schema and backend functions |
| Phase 3 | Public website pages |
| Phase 4 | Courses and admission enquiry system |
| Phase 5 | Admin authentication and dashboard |
| Phase 6 | Enquiry and student management |
| Phase 7 | SEO, validation and security |
| Phase 8 | Testing and Vercel deployment |

## 16. Acceptance Criteria

The project is considered complete when:

- [ ]All public website pages work.
- [ ]Courses are dynamically loaded from Convex.
- [ ]Admin can manage courses.
- [ ]Students can submit admission enquiries.
- [ ]Enquiries are saved successfully in Convex.
- [ ]Admin can view and manage enquiries.
- [ ]Admin can convert enquiries into students.
- [ ]Clerk authentication works.
- [ ]Unauthorized users cannot access admin routes or protected Convex functions.
- [ ]Dashboard statistics work.
- [ ]WhatsApp contact works.
- [ ]Website is responsive.
- [ ]SEO metadata is implemented.
- [ ]Application is deployed successfully.

## 17. Important Scope Decisions

For the initial release, I recommend:

- No student login or student portal.
- No online payment gateway.
- No online examination system.
- No automated certificate generation.
- No complex attendance management.
- No multi-branch management.

These can be added in future versions.

The first version should focus on getting student enquiries, managing admissions, and giving the institute complete control over its website through the admin dashboard.

## Final Technical Recommendation

Next.js Logo Vector Free Download | Logowik

Next.js

Application and frontend

Convex Auth

Convex

Database and backend

Component Reference - UI components - Next.js | Clerk Docs

Clerk

Authentication

My recommendation: Build this as a single-institute CMS and admission management system, rather than just a static website. This will allow the institute owner to update course fees, add new batches, manage enquiries and maintain website content without needing a developer every time.