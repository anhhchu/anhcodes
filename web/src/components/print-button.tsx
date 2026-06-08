"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print border border-ink px-5 py-2 text-sm italic text-ink transition-colors hover:bg-ink hover:text-canvas"
    >
      Download PDF
    </button>
  );
}
