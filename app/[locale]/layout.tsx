import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/types";
import "../globals.css";

export const metadata: Metadata = {
  title: "Cristian Sîrbu | Frontend Developer",
  applicationName: "Cristian Sîrbu — Portfolio",
  authors: [{ name: "Cristian Sîrbu" }],
};

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export const dynamicParams = false;

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale}><body>{children}</body></html>;
}
