/* ==========================================================================
   StatsRow.tsx
   --------------------------------------------------------------------------
   The activity stats tray: view count, response count, and when the last
   response arrived. Counts animate when they change. Ported from
   nr-symfony's status-banner/StatsRow.tsx.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import * as h from "./helpers";
import { icons } from "./icons";
import type { DateLike, ReferralStats, Viewer } from "./types";

// NOTE: ported from the source, which showed the response stat only when
// `responseCount > 1`, so a posting with exactly one response showed no
// response stat at all. Almost certainly a bug, kept so output matches the
// original. Set to 0 to show a lone response.
const SHOW_RESPONSES_WHEN = 1;

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---- CountUp -------------------------------------------------------------- */

interface CountUpProps {
  end?: number;
  start?: number;
  duration?: number;
  preserveValue?: boolean;
}

function CountUp({ end = 0, start = 0, duration = 1, preserveValue = true }: CountUpProps) {
  const [value, setValue] = useState(start);

  // Where the next animation starts from: the last value we landed on.
  const fromRef = useRef(start);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = preserveValue ? fromRef.current : start;
    const to = end;

    const settle = () => {
      fromRef.current = to;
      setValue(to);
    };

    if (from === to || duration <= 0 || prefersReducedMotion()) {
      settle();
      return;
    }

    const ms = duration * 1000;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setValue(Math.round(from + (to - from) * eased));

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, start, duration, preserveValue]);

  return <>{value.toLocaleString()}</>;
}

/* ---- DateDisplay ----------------------------------------------------------
   A relative timestamp, with the absolute date on hover. */

function DateDisplay({ date, now }: { date: DateLike; now?: number }) {
  const relative = h.fromNow(date, now);
  const absolute = h.formatDate(date);

  return (
    <span className="sb__date" title={absolute}>
      {relative}
      <span className="sb__date__tooltip">{absolute}</span>
    </span>
  );
}

/* ---- StatsRow --------------------------------------------------------- */

interface Stat {
  unit: "view" | "response" | "lastResponse";
  value: number | DateLike;
  display: boolean;
}

interface StatsRowProps {
  posting: ReferralStats | null | undefined;
  viewer?: Viewer;
  now?: number;
}

function renderStat(stat: Stat, now?: number) {
  if (stat.unit === "view") {
    const value = stat.value as number;
    return (
      <>
        <img className="sb__icon" alt="" src={icons.views} />
        <b>
          <CountUp end={value} duration={1} preserveValue={true} />
        </b>{" "}
        {h.plurify("view", value)}
      </>
    );
  }

  if (stat.unit === "response") {
    const value = stat.value as number;
    return (
      <>
        <img className="sb__icon" alt="" src={icons.chat} />
        <b>
          <CountUp end={value} duration={1} preserveValue={true} />
        </b>{" "}
        {h.plurify("response", value)}
      </>
    );
  }

  if (stat.unit === "lastResponse") {
    return (
      <>
        <img className="sb__icon" alt="" src={icons.reply} />
        <span>
          Last response: <DateDisplay date={stat.value as DateLike} now={now} />
        </span>
      </>
    );
  }

  return null;
}

export function StatsRow({ posting, now }: StatsRowProps) {
  if (!posting) return null;

  // Same gate the source applied to the stats row: open/pending, and never
  // on a direct posting.
  if (!h.isOpenOrPending(posting) || h.isDirect(posting)) return null;

  const viewCount = posting.viewCount || 0;
  const responseCount = posting.responseCount || 0;
  const lastResponseAt = posting.lastResponseAt;

  const allStats: Stat[] = [
    { unit: "view", value: viewCount, display: viewCount > 0 },
    { unit: "response", value: responseCount, display: responseCount > SHOW_RESPONSES_WHEN },
    { unit: "lastResponse", value: lastResponseAt, display: isFinite(h.toTime(lastResponseAt)) },
  ];
  const stats = allStats.filter((stat) => stat.display);

  if (!stats.length) return null;

  return (
    <div className="sb__stats">
      {stats.map((stat) => (
        <div className="sb__stat" key={"stat-" + stat.unit}>
          <span className="sb__stat__value">{renderStat(stat, now)}</span>
        </div>
      ))}
    </div>
  );
}
