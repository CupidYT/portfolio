import Link from "next/link";

export default function NotFound() {
  return <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-5 px-6 text-center"><span className="text-sm text-accent">404</span><h1 className="text-3xl font-semibold">Page not found</h1><Link href="/ro" className="button">Cristian Sîrbu — Portfolio</Link></main>;
}
