/* ==========================================================================
   useStreamedSummary.ts
   --------------------------------------------------------------------------
   v2's stream, ported from nr-symfony's status-banner/useStreamedSummary.ts.
   Calls the real deployed API (referral-signals-api, a separate Vercel
   project; see its README) with a Turnstile token; on any failure (rate
   limit, a rejected Turnstile token, a guardrail mismatch, or no
   `window.turnstile` at all) it falls back to a local mock that types out
   two sentences on a timer, so the widget never shows a bare error.

   - Debounced ~500ms after the last input change, not on every drag tick.
   - options.auto === false suppresses that entirely, leaving the caller to
     fire each request through regenerate(). Every real request is a billed
     model call.
   - `stale` goes true the instant inputs change, so the caller can dim the
     v2 banner while a regenerate is pending or in flight.
   - A request started for one set of inputs is abandoned the moment newer
     inputs arrive, via the requestId guard below.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import * as h from "./helpers";
import { THRESHOLDS, selectBanner } from "./StatusBanner";
import type { TokenGetter } from "./useTurnstileToken";
import type { BannerKey, BannerState, DateLike, Matter, ReferralStats, Viewer } from "./types";

const DEBOUNCE_MS = 500;
const THINK_MS = 400; // loading, before the first word (mock path only)
const WORD_MS = 55; // streaming, per word

const API_ENDPOINT = "https://referral-signals-api.vercel.app/api/summary";

function toIso(value: DateLike): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "number") return new Date(value).toISOString();
  return value;
}

const FALLBACK_MESSAGES: Record<string, string> = {
  rate_limit: "Too many requests right now.",
  turnstile: "Couldn't verify the request.",
  bad_request: "Something was wrong with the request.",
  server_error: "The summary service hit an error.",
  guardrail: "Couldn't generate a summary.",
};

// Mock copy, used only when the real API call fails or isn't reachable.
function describeActivity(posting: ReferralStats, now: number): string {
  const responses = posting.responseCount || 0;
  const isFresh = h.isWithinHours(posting.postedAt, THRESHOLDS.freshHours, now);
  const ownerActive = h.isWithinHours(posting.lastOwnerMessageAt, THRESHOLDS.ownerActiveHours, now);

  if (posting.ownerHasResponded && ownerActive) {
    return "The attorney is actively reading responses right now.";
  }
  if (isFresh && responses === 0) {
    return "This just went live, so an early reply has the best shot at standing out.";
  }
  if (isFresh && responses > 0 && responses <= THRESHOLDS.competitiveMax && !posting.ownerHasResponded) {
    return "A couple of replies are already in, but there is still room to make the shortlist.";
  }
  if (isFresh && responses >= THRESHOLDS.trendingMin && !posting.ownerHasResponded) {
    return "This is drawing noticeably more interest than most, so a fast reply matters here.";
  }
  if (h.isWithinDays(posting.postedAt, THRESHOLDS.dormantDays, now)) {
    return "Interest has cooled since it first posted, which usually means a fresh reply gets noticed again.";
  }
  return "This has been open for a while without much recent activity.";
}

function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function describeMatter(matter: Matter): string {
  const practiceArea = matter.practiceArea.toLowerCase();
  return (
    "It is " +
    article(practiceArea) +
    " " +
    practiceArea +
    " matter out of " +
    matter.state +
    ": " +
    matter.description +
    " Fee split runs " +
    matter.feeSplit +
    "."
  );
}

/* ---- hook ----------------------------------------------------------------- */

export interface StreamResult {
  state: BannerState;
  activityText?: string;
  matterText?: string;
  error?: string;
  category?: BannerKey | "none";
  stale: boolean;
  regenerate: () => void;
}

export interface StreamOptions {
  forceError?: boolean;
  getTurnstileToken?: TokenGetter | null;
  auto?: boolean;
}

export function useStreamedSummary(
  posting: ReferralStats,
  viewer: Viewer,
  matter: Matter,
  now: number,
  depsKey: string,
  options?: StreamOptions,
): StreamResult {
  const [state, setState] = useState<BannerState>("loading");
  const [activityText, setActivityText] = useState<string | undefined>(undefined);
  const [matterText, setMatterText] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<BannerKey | "none" | undefined>(undefined);
  const [stale, setStale] = useState(false);

  // Identifies the current request; any timer or fetch callback whose id no
  // longer matches belongs to an abandoned run and writes nothing.
  const requestId = useRef(0);
  const timers = useRef<number[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const forceError = Boolean(options?.forceError);
  const tokenGetter = options?.getTurnstileToken;
  const auto = !(options && options.auto === false);

  function clearTimers() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }

  function revealWords(activity: string, matterLine: string, myId: number, resolvedCategory: BannerKey | "none") {
    const activityWords = activity.split(" ");
    const matterWords = matterLine.split(" ");
    setState("streaming");

    activityWords.forEach((_word, i) => {
      const wordTimer = window.setTimeout(
        () => {
          if (requestId.current !== myId) return;
          setActivityText(activityWords.slice(0, i + 1).join(" "));
        },
        (i + 1) * WORD_MS,
      );
      timers.current.push(wordTimer);
    });

    const matterStartDelay = activityWords.length * WORD_MS;
    matterWords.forEach((_word, i) => {
      const wordTimer = window.setTimeout(
        () => {
          if (requestId.current !== myId) return;
          setMatterText(matterWords.slice(0, i + 1).join(" "));
          if (i === matterWords.length - 1) {
            setCategory(resolvedCategory);
            setState("done");
          }
        },
        matterStartDelay + (i + 1) * WORD_MS,
      );
      timers.current.push(wordTimer);
    });
  }

  function runMockFallback(myId: number) {
    const thinkTimer = window.setTimeout(() => {
      if (requestId.current !== myId) return;
      const activity = describeActivity(posting, now);
      const matterLine = describeMatter(matter);
      const chosen = selectBanner(posting, viewer, now);
      const resolvedCategory: BannerKey | "none" = chosen ? chosen.key : "none";
      revealWords(activity, matterLine, myId, resolvedCategory);
    }, THINK_MS);
    timers.current.push(thinkTimer);
  }

  function start(myId: number) {
    setState("loading");
    setActivityText(undefined);
    setMatterText(undefined);
    setError(undefined);
    setCategory(undefined);
    setStale(false);

    if (forceError) {
      const thinkTimer = window.setTimeout(() => {
        if (requestId.current !== myId) return;
        setState("error");
        setError("Couldn't generate a summary.");
      }, THINK_MS);
      timers.current.push(thinkTimer);
      return;
    }

    if (!tokenGetter) {
      // No widget on this page (e.g. Turnstile script hasn't loaded yet):
      // fall straight to the local mock rather than sending an
      // unverifiable request.
      runMockFallback(myId);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    const tokenPromise = tokenGetter(() => requestId.current !== myId);

    tokenPromise
      .then((token) => {
        if (requestId.current !== myId) return Promise.reject({ name: "AbortError" });
        return fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stats: {
              state: posting.state,
              isDirect: posting.isDirect,
              postedAt: toIso(posting.postedAt),
              viewCount: posting.viewCount,
              responseCount: posting.responseCount,
              lastResponseAt: toIso(posting.lastResponseAt),
              ownerHasResponded: posting.ownerHasResponded,
              lastOwnerMessageAt: toIso(posting.lastOwnerMessageAt),
            },
            viewer,
            matter,
            turnstileToken: token || "turnstile-failed",
          }),
          signal: controller.signal,
        });
      })
      .then((res) => res.json())
      .then((data) => {
        if (requestId.current !== myId) return;
        if (!data.ok) {
          setState("error");
          setError(FALLBACK_MESSAGES[data.reason] || "Couldn't generate a summary.");
          return;
        }
        revealWords(data.activityText, data.matterText, myId, data.category);
      })
      .catch((err) => {
        if (requestId.current !== myId) return;
        if (err?.name === "AbortError") return;
        setState("error");
        setError("Couldn't reach the summary service.");
      });
  }

  function regenerate() {
    requestId.current += 1;
    clearTimers();
    start(requestId.current);
  }

  useEffect(() => {
    requestId.current += 1;
    const myId = requestId.current;
    // Flips the instant depsKey changes, synchronously, so a stale v2
    // result dims immediately rather than on next tick — the debounced
    // fetch/mock below is what actually lands new content.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStale(true);
    clearTimers();
    if (!auto) return clearTimers;

    const debounceTimer = window.setTimeout(() => {
      if (requestId.current !== myId) return;
      start(myId);
    }, DEBOUNCE_MS);
    timers.current.push(debounceTimer);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  return { state, activityText, matterText, error, category, stale, regenerate };
}
