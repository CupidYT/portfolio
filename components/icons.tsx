import type { SVGProps } from "react";

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" {...props}><path d="M6 18 18 6M6 6h12v12" /></svg>;
}

export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" {...props}><path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4" /></svg>;
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" {...props}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>;
}

export function LocationIcon(props: SVGProps<SVGSVGElement>) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" {...props}><path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></svg>;
}
