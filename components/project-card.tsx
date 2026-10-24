import Image from "next/image";
import { assetPath } from "@/lib/paths";
import type { Copy, Project } from "@/lib/types";
import { ArrowIcon } from "./icons";

export function ProjectPreview({ project, copy, featured = false }: { project: Project; copy: Copy; featured?: boolean }) {
  return (
    <div className={`project-visual tone-${project.id % 5}`}>
      <div className="screen transition-transform duration-500 ease-out motion-reduce:transition-none">
        <div className="screen-bar" aria-hidden="true"><span>● ● ●</span><span>{project.domain}</span><span>↗</span></div>
        {project.image ? (
          <Image
            src={assetPath(project.image.src)}
            width={project.image.width}
            height={project.image.height}
            alt={`${copy.captureLabel} — ${project.name}`}
            sizes={featured ? "(max-width: 680px) 90vw, (max-width: 1200px) 46vw, 540px" : "(max-width: 680px) 43vw, (max-width: 1200px) 29vw, 350px"}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.025] group-focus-within:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div className="missing-preview"><span aria-hidden="true">{project.name[0]}</span><small>{copy.previewPending}</small></div>
        )}
      </div>
    </div>
  );
}

export function ProjectCard({ project, copy, featured = false, onOpen }: { project: Project; copy: Copy; featured?: boolean; onOpen?: (project: Project) => void }) {
  const stack = project.stack === "next" ? "Next.js · Frontend" : project.stack === "wordpress" ? "WordPress" : copy.website;

  return (
    <article className={`project-card group transition-[translate,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-white hover:bg-white/40 hover:shadow-[0_16px_35px_rgba(106,93,143,0.13)] focus-within:border-white focus-within:shadow-[0_12px_30px_rgba(106,93,143,0.12)] motion-reduce:transform-none motion-reduce:transition-none ${featured ? "featured-card" : "archive-card"}`}>
      {project.image ? <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.imageOpen} — ${project.name}`} className="block"><ProjectPreview project={project} copy={copy} featured={featured} /></a> : <ProjectPreview project={project} copy={copy} featured={featured} />}
      <div className="project-copy">
        <span className="project-stack">{stack}</span>
        <h3>{project.name}</h3>
        {project.partial && <p className="partial-note">{copy.partial}</p>}
        {featured && <p className="project-description">{project.description}</p>}
        {featured ? <div className="project-actions">
          <button type="button" className="text-button inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-ink" aria-label={`${copy.openProject} ${project.name}`} onClick={() => onOpen?.(project)}>{copy.case}<ArrowIcon className="size-3" /></button>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-accent">{copy.visit}<ArrowIcon className="size-3" /></a>
        </div> : project.image ? <a className="archive-link inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-ink" href={project.url} target="_blank" rel="noopener noreferrer">{copy.visit}<ArrowIcon className="size-3" /></a> : <span className="pending-label">{copy.previewMissing}</span>}
      </div>
    </article>
  );
}
