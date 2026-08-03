"use client";

import { useRef } from "react";
import { CopyCodeButtons } from "./copy-code-buttons";

export function PostBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={ref}
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CopyCodeButtons containerRef={ref} />
    </>
  );
}
