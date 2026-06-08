import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Data-pipeline motif: faint horizontal "pipes" with packets that     */
/* travel left -> right along them (SVG animateMotion — no JS needed,   */
/* works in the static export). Hairline strokes, warm tones, no glow.  */
/* ------------------------------------------------------------------ */

const VW = 1200;
const VH = 560;

type Line = { y: number; amp: number; freq: number; phase: number };

const LINES: Line[] = [
  { y: 90, amp: 26, freq: 1.4, phase: 0.2 },
  { y: 170, amp: 18, freq: 2.0, phase: 1.1 },
  { y: 250, amp: 32, freq: 1.2, phase: 2.3 },
  { y: 330, amp: 20, freq: 1.8, phase: 0.7 },
  { y: 410, amp: 28, freq: 1.5, phase: 3.0 },
  { y: 480, amp: 16, freq: 2.2, phase: 1.8 },
];

function openSmoothPath(pts: [number, number][]): string {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} `;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
  }
  return d;
}

const PATHS = LINES.map((ln) => {
  const pts: [number, number][] = [];
  for (let x = 0; x <= VW; x += 60) {
    const y = ln.y + ln.amp * Math.sin((x / VW) * ln.freq * Math.PI * 2 + ln.phase);
    pts.push([x, y]);
  }
  return openSmoothPath(pts);
});

const PACKET_COLORS = ["#9c6b4f", "#c98b80", "#16130f"];

// Per-line packets: { duration, startOffset } — negative begin desyncs them.
const PACKETS: { line: number; dur: number; begin: number; r: number }[] = [
  { line: 0, dur: 13, begin: 0, r: 3.5 },
  { line: 1, dur: 10, begin: -4, r: 3 },
  { line: 2, dur: 16, begin: -2, r: 4 },
  { line: 2, dur: 16, begin: -9, r: 3 },
  { line: 3, dur: 11, begin: -6, r: 3.5 },
  { line: 4, dur: 14, begin: -3, r: 3.5 },
  { line: 4, dur: 14, begin: -10, r: 3 },
  { line: 5, dur: 9, begin: -5, r: 3 },
];

export function DataFlow({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* Pipeline field */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          {/* pipes */}
          {PATHS.map((d, i) => (
            <path
              key={i}
              id={`pipe-${i}`}
              d={d}
              fill="none"
              stroke={i % 3 === 2 ? "#9c6b4f" : "#6b625b"}
              strokeWidth={1}
              opacity={0.22}
            />
          ))}
          {/* data packets travelling left -> right */}
          {PACKETS.map((p, i) => (
            <circle
              key={i}
              r={p.r}
              fill={PACKET_COLORS[i % PACKET_COLORS.length]}
              opacity={0.85}
            >
              <animateMotion
                dur={`${p.dur}s`}
                begin={`${p.begin}s`}
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath xlinkHref={`#pipe-${p.line}`} />
              </animateMotion>
            </circle>
          ))}
        </svg>
      </div>

      {/* Soft canvas wash so the headline stays legible over the lines. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-canvas) 0%, rgba(243,232,228,0.55) 40%, transparent 74%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p className="mb-5 text-sm uppercase italic tracking-[0.2em] text-muted">
            {eyebrow}
          </p>
        )}
        {title && (
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl">
            {title}
          </h1>
        )}
        {description && (
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
