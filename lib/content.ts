import ro from "@/content/ro.json";
import en from "@/content/en.json";
import ru from "@/content/ru.json";
import rawProjects from "@/content/projects.json";
import profileData from "@/content/profile.json";
import type { Copy, Locale, Profile, Project } from "./types";

const dictionaries = { ro, en, ru } satisfies Record<Locale, Copy>;
export const profile: Profile = profileData;

export function getContent(locale: Locale) {
  const projects: Project[] = rawProjects.map((project) => ({
    ...project,
    stack: project.stack === "next" ? "next" : project.stack === "wordpress" ? "wordpress" : "website",
    description: project.description[locale] ?? "",
  }));

  return { copy: dictionaries[locale], projects, profile };
}
