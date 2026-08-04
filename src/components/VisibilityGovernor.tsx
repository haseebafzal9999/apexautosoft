"use client";

import { useEffect } from "react";

// Pauses all CSS-driven infinite animations (pulse dots, marquee) the moment the
// tab is hidden, so no animation consumes work while the page isn't visible.
export default function VisibilityGovernor() {
  useEffect(() => {
    const sync = () =>
      document.documentElement.classList.toggle(
        "page-hidden",
        document.visibilityState !== "visible"
      );
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  return null;
}