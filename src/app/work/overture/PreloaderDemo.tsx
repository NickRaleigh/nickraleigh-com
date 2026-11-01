// Placeholder geometry: a generic six-petal lockup standing in for
// Overture's actual logo mark (no vector source for the real mark was
// available to port). The draw-in animation itself (.preloader-demo__petal
// in _brand-showcase.scss) is the real, working piece.
const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

export function PreloaderDemo() {
  return (
    <svg className="preloader-demo" viewBox="0 0 140 140" aria-hidden="true">
      {PETAL_ANGLES.map((angle) => (
        <path
          key={angle}
          className="preloader-demo__petal"
          d="M70,70 C85,55 85,30 70,15 C55,30 55,55 70,70 Z"
          transform={`rotate(${angle} 70 70)`}
        />
      ))}
    </svg>
  );
}
