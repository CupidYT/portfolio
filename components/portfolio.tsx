"use client";

import Link from "next/link";
import { assetPath } from "@/lib/paths";
import { useState } from "react";
import { locales, type Copy, type Locale, type Profile, type Project, type ProjectStack } from "@/lib/types";
import { ArrowIcon, DownloadIcon, LocationIcon, MailIcon } from "./icons";
import { RichText } from "./rich-text";
import { ProjectCard } from "./project-card";
import { ProjectDialog } from "./project-dialog";

const languageNames = { ro: "Română", en: "English", ru: "Русский" };

export function Portfolio({ locale, copy, profile, projects }: { locale: Locale; copy: Copy; profile: Profile; projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | ProjectStack>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [announce, setAnnounce] = useState(false);
  const featured = profile.featuredIds.map((id) => projects.find((project) => project.id === id)).filter((project): project is Project => Boolean(project));
  const archive = projects.filter((project) => !profile.featuredIds.includes(project.id));
  const visible = featured.filter((project) => filter === "all" || project.stack === filter);
  const cvUrl = assetPath(`/cv/cristian-sirbu-${locale}.pdf`);

  function setProjectFilter(nextFilter: typeof filter) { setFilter(nextFilter); setAnnounce(true); }

  return <>
    <a href="#main" className="skip">{copy.skip}</a>
    <div className="page">
      <header className="glass">
        <a className="brand" href="#main" aria-label={copy.brandLabel}><span className="brand-mark transition-transform duration-300 hover:-rotate-6 motion-reduce:transform-none" aria-hidden="true">C.</span><span><strong>{profile.name}</strong><small>Frontend Developer</small></span></a>
        <nav aria-label={copy.navLabel}>
          {[["#despre", copy.navAbout], ["#competente", copy.navSkills], ["#proiecte", copy.navWork], ["#contact", copy.navContact]].map(([href, label]) => <a key={href} href={href} className="nav-item relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100">{label}</a>)}
        </nav>
        <div className="header-actions"><div className="lang-switch" role="group" aria-label={copy.languageLabel}>{locales.map((code) => <Link key={code} href={`/${code}`} scroll={false} lang={code} aria-label={languageNames[code]} aria-current={locale === code ? "page" : undefined} className="language-link transition-[background-color,box-shadow,color] duration-200 hover:bg-white/60">{code.toUpperCase()}</Link>)}</div><a href={cvUrl} target="_blank" rel="noopener noreferrer" className="small-button hidden items-center gap-2 transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md min-[681px]:inline-flex motion-reduce:transform-none">{copy.navCV}<ArrowIcon className="size-3" /></a></div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title"><div><p className="eyebrow">{copy.heroHello}</p><h1 id="hero-title">{profile.name}</h1><h2>{copy.heroRole}</h2><p className="intro"><RichText value={copy.intro} /></p><div className="actions"><a className="button" href="#proiecte">{copy.explore}<ArrowIcon /></a><a className="button secondary" href={cvUrl} download>{copy.heroCV}<DownloadIcon /></a></div><p className="hero-note">{copy.heroNote}</p></div><div className="hero-art"><div className="halo" aria-hidden="true" /><div className="orb transition-transform duration-700 hover:rotate-0 motion-reduce:transform-none" aria-hidden="true"><span>C</span></div><div className="spark" aria-hidden="true">✧</div><div className="float-card years"><strong>{profile.yearsExperience}</strong><small>{copy.years}</small></div><div className="float-card projects"><strong>{profile.totalProjects}</strong><small>{copy.sites}</small></div></div></section>
        <section id="despre" className="section glass about" aria-labelledby="about-title"><div><p className="eyebrow">{copy.aboutEyebrow}</p><h2 id="about-title"><RichText value={copy.aboutTitle} /></h2><div className="facts"><div className="fact"><b>{profile.yearsExperience}</b><span>{copy.years}</span></div><div className="fact"><b>{profile.totalProjects}</b><span>{copy.sites}</span></div></div></div><p className="about-copy">{copy.aboutCopy}</p></section>
        <section id="competente" className="section glass" aria-labelledby="skills-title"><p className="eyebrow">{copy.skillsEyebrow}</p><h2 id="skills-title" className="mb-5">{copy.skillsTitle}</h2><div className="skills-grid">
          {[["</>", "HTML · CSS · Tailwind", copy.foundation], ["W.", "WordPress · Next.js", copy.projectExperience], ["{ }", "JavaScript · React · Angular · PHP", copy.learning]].map(([icon, title, note]) => <div className="skill-box transition-[translate,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-white/40 hover:shadow-md motion-reduce:transform-none" key={title}><div className="skill-icon" aria-hidden="true">{icon}</div><h3>{title}</h3><p>{note}</p></div>)}
        </div></section>
        <section id="proiecte" className="section glass" aria-labelledby="projects-title"><p className="eyebrow">{copy.workEyebrow}</p><div className="section-heading"><h2 id="projects-title"><RichText value={copy.workTitle} /></h2><p>{copy.workDesc}</p></div><div className="filters" role="group" aria-label={copy.filterLabel}>{(["all", "next", "wordpress"] as const).map((key) => <button key={key} type="button" className="filter transition-[background-color,box-shadow,color] duration-200 hover:bg-white/60" aria-pressed={filter === key} onClick={() => setProjectFilter(key)}>{key === "all" ? copy.all : key === "next" ? "Next.js" : "WordPress"}</button>)}</div><p className="sr-only" role="status" aria-live="polite">{announce ? visible.length === 1 ? copy.oneResult : `${visible.length} ${copy.manyResults}` : ""}</p><div className="projects-grid grid gap-x-5 gap-y-6 md:grid-cols-2">{visible.map((project) => <ProjectCard key={project.id} project={project} copy={copy} featured onOpen={setActiveProject} />)}</div><p className="project-note">{copy.projectNote}</p>
          <details className="archive" id="archive"><summary className="transition-[background-color,box-shadow] duration-300 hover:bg-white/60 hover:shadow-sm"><span>{copy.archiveTitle}</span><small>{archive.length} {copy.archiveCount}</small></summary><p className="archive-intro">{copy.archiveIntro}</p><div className="archive-grid grid grid-cols-2 gap-3 md:grid-cols-3">{archive.map((project) => <ProjectCard key={project.id} project={project} copy={copy} />)}</div></details>
        </section>
        <section className="section glass cv-band" aria-labelledby="cv-title"><div className="paper-icon" aria-hidden="true">CV</div><div><h2 id="cv-title">{copy.cvTitle}</h2><p>{copy.cvDesc}</p></div><a className="small-button inline-flex items-center gap-2 transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none" href={cvUrl} download>{copy.cvButton}<DownloadIcon className="size-3.5 shrink-0" /></a></section>
        <section id="contact" className="section glass contact" aria-labelledby="contact-title"><div><p className="eyebrow">{copy.contactEyebrow}</p><h2 id="contact-title"><RichText value={copy.contactTitle} /></h2><p>{copy.contactDesc}</p></div><address className="contact-box contact-address"><span className="mb-2 block text-[10px] text-muted">{copy.contactLabel}</span><a href={`mailto:${profile.email}`} className="email-link inline-flex items-center gap-2 break-all text-[12px] font-medium text-ink transition-colors duration-200 hover:text-accent"><MailIcon className="shrink-0" />{profile.email}</a><span className="mt-4 flex items-center gap-2 text-[11px]"><LocationIcon className="shrink-0" />{profile.location[locale]}</span></address></section>
      </main>
      <footer><span>{copy.footer}</span><a href="#main" className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-accent">{copy.backTop}<ArrowIcon className="size-3 -rotate-45" /></a></footer>
    </div>
    <ProjectDialog project={activeProject} copy={copy} onClose={() => setActiveProject(null)} />
  </>;
}
