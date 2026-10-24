import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Portfolio } from "@/components/portfolio";
import { getContent } from "@/lib/content";
import { isLocale, locales } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const descriptions = {
    ro: "Cristian Sîrbu, Frontend Developer din Chișinău. WordPress, HTML, CSS, Tailwind și frontend Next.js. Aproximativ 4 ani de experiență și contribuții la 108 proiecte web.",
    en: "Cristian Sîrbu, Frontend Developer based in Chișinău. WordPress, HTML, CSS, Tailwind and Next.js frontend. Around 4 years of experience across 108 web projects.",
    ru: "Cristian Sîrbu, Frontend Developer из Кишинёва. WordPress, HTML, CSS, Tailwind и frontend на Next.js. Около 4 лет опыта и участие в 108 веб-проектах.",
  };
  const origin = process.env.SITE_URL;
  const alternates = origin ? { canonical: `${origin.replace(/\/$/, "")}/${locale}`, languages: Object.fromEntries(locales.map((lang) => [lang, `${origin.replace(/\/$/, "")}/${lang}`])) } : undefined;
  return { title: "Cristian Sîrbu | Frontend Developer — WordPress & Next.js", description: descriptions[locale], alternates, openGraph: { title: "Cristian Sîrbu — Frontend Developer", description: descriptions[locale], locale: locale === "ro" ? "ro_RO" : locale === "en" ? "en_US" : "ru_RU", type: "website" } };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  return <Portfolio locale={locale} {...content} />;
}
