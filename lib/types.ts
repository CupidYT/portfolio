import type romanian from "@/content/ro.json";

export const locales = ["ro", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export type Copy = typeof romanian;
export type ProjectStack = "next" | "wordpress" | "website";

export interface Project {
  id: number;
  name: string;
  url: string;
  domain: string;
  stack: ProjectStack;
  partial: boolean;
  image: { src: string; width: number; height: number } | null;
  description: string;
}

export interface Profile {
  name: string;
  firstName: string;
  email: string;
  telegram: string;
  location: Record<Locale, string>;
  yearsExperience: string;
  totalProjects: number;
  featuredIds: number[];
}

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
