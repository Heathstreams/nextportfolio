import { Fragment, type ReactNode } from "react";

const HIGHLIGHT = /<hl>(.*?)<\/hl>/g;

/**
 * Renders a dictionary string, turning <hl>…</hl> into an accented span.
 * Keeps the dictionaries plain, serializable data instead of JSX.
 */
export function highlight(text: string, className: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(HIGHLIGHT)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      parts.push(<Fragment key={lastIndex}>{text.slice(lastIndex, start)}</Fragment>);
    }
    parts.push(
      <span key={start} className={className}>
        {match[1]}
      </span>
    );
    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={lastIndex}>{text.slice(lastIndex)}</Fragment>);
  }

  return parts;
}
