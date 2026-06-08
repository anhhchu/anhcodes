/**
 * Editorial starburst mark — echoes the OpenWeb reference aesthetic.
 * 16 tapered rays radiating from a hollow center, rendered in `currentColor`.
 */
export function LogoMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  const rays = Array.from({ length: 16 });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      {rays.map((_, i) => (
        <rect
          key={i}
          x="48"
          y="6"
          width="4"
          height="30"
          rx="2"
          transform={`rotate(${(360 / rays.length) * i} 50 50)`}
        />
      ))}
    </svg>
  );
}
