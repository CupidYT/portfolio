"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/paths";
import type { Copy, Project } from "@/lib/types";
import { ArrowIcon } from "./icons";

export function ProjectDialog({ project, copy, onClose }: { project: Project | null; copy: Copy; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  function closeBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }

  return <dialog ref={ref} aria-labelledby="project-dialog-title" onCancel={onClose} onClose={onClose} onClick={closeBackdrop}>
    <div className="dialog-inner">
      <div className="dialog-top"><div><p className="eyebrow">{copy.caseEyebrow}</p><h2 id="project-dialog-title">{project?.name}</h2></div><button type="button" className="close transition-colors hover:bg-white" aria-label={copy.closeProject} onClick={onClose}>×</button></div>
      {project && <>
        {project.image && <Image src={assetPath(project.image.src)} width={project.image.width} height={project.image.height} sizes="(max-width: 720px) 90vw, 660px" alt={`${copy.captureLabel} — ${project.name}`} className="mt-6 h-auto max-h-80 w-full rounded-xl object-contain" />}
        <ul className="detail-list"><li><b>{copy.context}</b>{project.description}</li><li><b>{copy.contribution}</b>{project.partial ? copy.partial : project.stack === "next" ? copy.yumRole : copy.wpRole}</li></ul>
        <a className="button" href={project.url} target="_blank" rel="noopener noreferrer">{copy.visit}<ArrowIcon /></a>
      </>}
    </div>
  </dialog>;
}
