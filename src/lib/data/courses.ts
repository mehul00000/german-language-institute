/**
 * Static course copy that mirrors the Convex `courses` table shape.
 * Until the Convex deployment is connected (see README), the public pages
 * read from here; the admin dashboard writes to Convex and this file is
 * replaced by the `courses.list` query. Fees and durations are not stated
 * anywhere on the site: the institute sets them each term.
 */
import type { Level, Mode } from "@/lib/constants";

export type Course = {
  slug: string;
  level: Level;
  name: string;
  description: string;
  focus: string;
  curriculum: string[];
  eligibility: string;
  modes: Mode[];
};

export const COURSES: Course[] = [
  {
    slug: "a1-german-course",
    level: "A1",
    name: "A1 Beginner",
    description:
      "The first rung: the alphabet, the sounds, the sentences you actually need in a German street.",
    focus: "From the alphabet to ordering, asking and introducing yourself.",
    curriculum: [
      "Alphabet, sounds and pronunciation",
      "Introducing yourself and others",
      "Numbers, prices and telling the time",
      "Café, shop and travel phrases",
      "Present tense and the accusative",
      "Goethe-style A1 paper practice",
    ],
    eligibility: "No German at all. Bring nothing but the will to speak.",
    modes: ["Offline", "Online"],
  },
  {
    slug: "a2-german-course",
    level: "A2",
    name: "A2 Elementary",
    description: "The everyday level: past tense, opinions, the phone call and the appointment.",
    focus: "Everyday conversation, the past, and getting things done on the phone.",
    curriculum: [
      "Perfect tense and everyday narratives",
      "Appointments, calls and small requests",
      "Health, weather and directions",
      "Writing short messages and notes",
      "Dative case and prepositions",
      "Goethe-style A2 paper practice",
    ],
    eligibility: "A1 certificate or the placement chat.",
    modes: ["Offline", "Online"],
  },
  {
    slug: "b1-german-course",
    level: "B1",
    name: "B1 Intermediate",
    description:
      "The level Germany asks for: work, training and the visa file run on B1 German.",
    focus: "Opinions, arguments and the paperwork of study and work.",
    curriculum: [
      "Opinions, plans and disagreements",
      "Work, study and the job interview",
      "Letters of complaint and application",
      "Sub-clauses and connectors",
      "Listening at conversational speed",
      "Goethe-style B1 paper practice",
    ],
    eligibility: "A2 certificate or the placement chat.",
    modes: ["Offline", "Online", "Hybrid"],
  },
  {
    slug: "b2-german-course",
    level: "B2",
    name: "B2 Upper Intermediate",
    description: "The professional level: you argue, present and negotiate without translating in your head.",
    focus: "Fluent argument, presentations and the professional register.",
    curriculum: [
      "Discussion and presentation practice",
      "News, radio and reportage listening",
      "Formal writing: applications and statements",
      "Passive, Konjunktiv II, nominal style",
      "Vocabulary for work and study",
      "Goethe-style B2 paper practice",
    ],
    eligibility: "B1 certificate or the placement chat.",
    modes: ["Offline", "Online", "Hybrid"],
  },
  {
    slug: "c1-german-course",
    level: "C1",
    name: "C1 Advanced",
    description: "The level of lectures, contracts and wit: German at university and at work.",
    focus: "Academic and professional German, writing at length.",
    curriculum: [
      "Lectures, talks and note-taking",
      "Essays, summaries and technical texts",
      "Idiom, register and nuance",
      "Konjunktiv I and indirect speech",
      "Speaking at length without notes",
      "Goethe-style C1 paper practice",
    ],
    eligibility: "B2 certificate or the placement chat.",
    modes: ["Offline", "Online", "Hybrid"],
  },
];

export function courseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
