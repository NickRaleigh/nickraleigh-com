// Traced from the hand-drawn asset at
// /home/nick/Design/nr-website/hand-drawn-me/hand-drawn-button.svg — a
// single wobbly pen stroke for the pill outline plus a second stroke for
// the arrow, both originally #e8a33d. Recolored to currentColor so the
// button controls it (and its hover state) the normal CSS way.
export function HandDrawnButtonOutline() {
  return (
    <svg
      className="hero__see-work-art"
      aria-hidden="true"
      viewBox="0 0 51.496204 14.191685"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Same closed path as the outline below, filled instead of stroked —
          the hover wash reads from this, so it's clipped to the actual
          wobbly oval instead of the button's rectangular box. */}
      <path
        className="hero__see-work-fill"
        d="m 46.61230,3.69101 c 10.97949,4.95839 -1.87279,7.54039 -5.61836,8.40589 -3.74557,0.8651 -32.61762,2.7193 -37.76776,0.4943 -5.15014,-2.2251 -2.18492,-6.67519 2.96524,-9.39469 5.15015,-2.7195 29.4414,-4.464 40.42088,0.4945 z"
        fill="currentColor"
        fillOpacity={0}
        stroke="none"
      />
      <path
        d="m 46.61230,3.69101 c 10.97949,4.95839 -1.87279,7.54039 -5.61836,8.40589 -3.74557,0.8651 -32.61762,2.7193 -37.76776,0.4943 -5.15014,-2.2251 -2.18492,-6.67519 2.96524,-9.39469 5.15015,-2.7195 29.4414,-4.464 40.42088,0.4945 z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.09128}
        strokeLinejoin="round"
      />
      <path
        d="m 35.74516,7.53001 5.91163,0.073 -3.0476,-1.76249 3.56166,2.46009 -2.82731,1.1016"
        fill="none"
        stroke="currentColor"
        strokeWidth={0.691}
        strokeLinejoin="round"
      />
    </svg>
  );
}
