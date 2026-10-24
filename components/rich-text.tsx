import { Fragment, type ReactNode } from "react";

/** Only the emphasis and line-break markup authored in our dictionaries is rendered. */
export function RichText({ value }: { value: string }): ReactNode {
  return value.split(/(<br\s*\/?>|<strong>[\s\S]*?<\/strong>|<em>[\s\S]*?<\/em>)/gi).map((part, index) => {
    if (/^<br\s*\/?>$/i.test(part)) return <br key={index} />;
    if (part.startsWith("<strong>")) return <strong key={index}><RichText value={part.slice(8, -9)} /></strong>;
    if (part.startsWith("<em>")) return <em key={index}><RichText value={part.slice(4, -5)} /></em>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}
