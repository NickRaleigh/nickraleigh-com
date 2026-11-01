// Ported from nr-symfony/templates/main/_brand-showcase.html.twig: the
// actual Overture logo lockup, six rounded rects (ry=half their own height,
// so each is a stadium/pill shape) fanned out by rotation around the
// viewBox origin, not a generic flower.
const PETALS = [
  { x: 0.417, y: 19.512 },
  { x: 184.425, y: -102.998, transform: "rotate(34.590609)" },
  { x: 14.118, y: -67.219, transform: "rotate(72.046228)" },
  { x: 0.417, y: -86.061, transform: "rotate(90)" },
  {
    x: -80.717,
    y: -102.334,
    transform: "matrix(0.38563285,-0.92265232,-0.92265232,-0.38563285,0,0)",
  },
  {
    x: -38.881,
    y: -106.697,
    transform: "matrix(0.82322943,-0.56770883,-0.56770883,-0.82322943,0,0)",
  },
];

export function PreloaderDemo() {
  return (
    <svg
      className="preloader-demo"
      viewBox="0 0 105.57316 105.57317"
      aria-hidden="true"
    >
      {PETALS.map((petal, i) => (
        <rect
          key={i}
          className="preloader-demo__petal"
          width="104.73894"
          height="66.548943"
          x={petal.x}
          y={petal.y}
          ry="33.274471"
          transform={petal.transform}
        />
      ))}
    </svg>
  );
}
