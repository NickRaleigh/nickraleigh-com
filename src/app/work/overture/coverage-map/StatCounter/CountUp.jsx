import React, { useEffect, useState } from "react";

// Local stand-in for the `react-countup` package (not a project dependency
// here): same call shape as the original (className/start/end/duration),
// animates the number from start to end over `duration` seconds with an
// ease-out curve, rendered as a <span> like react-countup's default.
function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t);
}

const CountUp = ({ className, start = 0, end = 0, duration = 1 }) => {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (start === end) {
      setValue(end);
      return;
    }
    let frame;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutQuad(t);
      setValue(Math.round(start + (end - start) * eased));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end, duration]);

  return <span className={className}>{value}</span>;
};

export default CountUp;
