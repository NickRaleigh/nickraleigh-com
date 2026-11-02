/* ==========================================================================
   useTurnstileToken.ts
   --------------------------------------------------------------------------
   Cloudflare Turnstile token getter for the live v2 call, extracted from
   nr-symfony's Sandbox.tsx (makeTurnstileTokenGetter). The widget itself
   loads via a <Script> tag in StatusBannerDemo.tsx; this just renders it
   into a container once window.turnstile is ready and exposes a
   queued getToken() that useStreamedSummary.ts calls before every request.

   appearance: "interaction-only" keeps the widget fully invisible unless
   Cloudflare decides an interactive challenge is actually needed, instead
   of showing its managed-mode confirmation box on every load. The
   container is pinned out of the layout flow (fixed, bottom corner; see
   status-banner-demo.scss) so even a challenge popup doesn't shift
   anything else on the page.
   ========================================================================== */

import { useEffect, useState } from "react";

// Public site key (not a secret), the same one nr-symfony's demo pages use.
// Registered in Cloudflare's Turnstile dashboard against the hostnames that
// are allowed to render it — any localhost origin is allowed there already,
// a deployed nr-nextjs domain needs adding before this resolves to a real
// token in production instead of failing open to the error state.
const TURNSTILE_SITE_KEY = "0x4AAAAAAFYtoUigzGzTV1LH";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          appearance?: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
        },
      ) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export type TokenGetter = (isStale?: () => boolean) => Promise<string | null>;

function makeTurnstileTokenGetter(containerSelector: string): TokenGetter {
  let widgetId: string | null = null;
  let pendingResolve: ((token: string | null) => void) | null = null;

  // render() throws synchronously on an invalid option; the try/catch below
  // means a render failure resolves (openly failed) instead of leaving
  // every getToken() call hanging forever.
  const ready = new Promise<void>((resolve) => {
    (function poll() {
      if (window.turnstile) {
        try {
          widgetId = window.turnstile.render(containerSelector, {
            sitekey: TURNSTILE_SITE_KEY,
            appearance: "interaction-only",
            callback: (token: string) => {
              if (pendingResolve) {
                const r = pendingResolve;
                pendingResolve = null;
                r(token);
              }
            },
            "error-callback": () => {
              if (pendingResolve) {
                const r = pendingResolve;
                pendingResolve = null;
                r(null);
              }
            },
          });
        } catch (e) {
          console.error("Turnstile render() failed:", e);
          widgetId = null;
        }
        resolve();
      } else {
        window.setTimeout(poll, 50);
      }
    })();
  });

  let queue: Promise<unknown> = Promise.resolve();

  // isStale, when given, is checked right before this call's turn actually
  // starts: a superseded caller gets skipped instantly instead of still
  // consuming a full execute() round trip.
  return function getToken(isStale?: () => boolean): Promise<string | null> {
    const result: Promise<string | null> = queue.then(() => {
      if (isStale && isStale()) return null;
      return ready.then(() => {
        if (widgetId === null) return null;
        if (isStale && isStale()) return null;
        return new Promise<string | null>((resolve) => {
          pendingResolve = resolve;
          // Reusing an invisible widget's execute() repeatedly without a
          // reset() between calls intermittently errors on the 2nd+ call.
          window.turnstile!.reset(widgetId!);
          window.turnstile!.execute(widgetId!);
        });
      });
    });
    queue = result.then(
      () => {},
      () => {},
    );
    return result;
  };
}

// Module-level singleton: the widget should only ever be rendered once per
// page. Created in an effect, not during render (render must stay pure —
// this reaches out to the DOM and to window.turnstile), guarded so a
// second mount (or, in dev, StrictMode's double effect invocation) reuses
// the same getter instead of rendering a second widget into the container.
let singleton: TokenGetter | null = null;

export function useTurnstileToken(containerSelector: string): TokenGetter | null {
  const [getter, setGetter] = useState<TokenGetter | null>(null);

  useEffect(() => {
    if (!singleton) singleton = makeTurnstileTokenGetter(containerSelector);
    // One-time handoff of the external getter into React state, not a
    // subscription — containerSelector is a static string, so this effect
    // runs once per mount, not a cascading loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGetter(() => singleton);
  }, [containerSelector]);

  return getter;
}
