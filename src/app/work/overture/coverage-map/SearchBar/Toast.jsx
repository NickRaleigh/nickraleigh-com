import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const TOAST_DURATION_MS = 3000;

// A single-slot toast: a new message replaces whatever is showing rather
// than queuing. Portaled to document.body for the same reason InfoBox is
// (../InfoBox/index.jsx) — fixed viewport positioning, not clipped by
// .coverage-map's overflow:hidden.
const Toast = ({ message, onDismiss }) => {
  const timeoutRef = useRef(null);
  // Next.js server-renders client components too (no document there),
  // unlike the original's purely client-side mount — bail out of the
  // portal until this is actually running in a browser.
  const canPortal = typeof document !== "undefined";

  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (message) {
      timeoutRef.current = window.setTimeout(onDismiss, TOAST_DURATION_MS);
    }
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
    // Intentionally keyed on `message` alone: `onDismiss` is a setState
    // setter wrapped in a fresh arrow function each render, and re-running
    // this to pick up a new reference would restart the dismiss timer.
  }, [message]);

  if (!canPortal) return null;

  // The live region itself stays mounted (rather than being conditionally
  // rendered) so a screen reader is already attached to it before the first
  // message arrives; only the message text inside toggles.
  return createPortal(
    <div className="coverage-map__toast-region" role="status" aria-live="polite">
      {message && <div className="coverage-map__toast">{message}</div>}
    </div>,
    document.body
  );
};

export default Toast;
