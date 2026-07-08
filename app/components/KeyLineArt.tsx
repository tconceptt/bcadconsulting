/**
 * The brand key, drawn as line art. `ks-draw` animates the stroke on page
 * load (globals.css collapses the animation under prefers-reduced-motion).
 */
export function KeyLineArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="52" cy="60" r="34" pathLength={1} className="ks-draw" />
      <circle
        cx="52"
        cy="60"
        r="16"
        pathLength={1}
        className="ks-draw ks-draw-2"
      />
      <path
        d="M86 60h218M232 60v26M262 60v38M292 60v26"
        pathLength={1}
        className="ks-draw ks-draw-3"
      />
    </svg>
  );
}
