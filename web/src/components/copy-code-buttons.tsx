"use client";

import { useEffect } from "react";

const ICON_COPY = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const ICON_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

export function CopyCodeButtons({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blocks = container.querySelectorAll("pre");
    const cleanups: (() => void)[] = [];

    blocks.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;

      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = ICON_COPY;

      const onClick = async () => {
        const code = pre.querySelector("code");
        if (!code) return;
        await navigator.clipboard.writeText(code.innerText);
        btn.innerHTML = ICON_CHECK;
        setTimeout(() => { btn.innerHTML = ICON_COPY; }, 2000);
      };

      btn.addEventListener("click", onClick);
      pre.appendChild(btn);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [containerRef]);

  return null;
}
