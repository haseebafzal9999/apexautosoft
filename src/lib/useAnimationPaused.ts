import { useEffect, useRef, useState } from "react";

// Gates continuous animations: paused = element offscreen (with margin) OR the
// tab/visibility is hidden. Used to stop rAF/Framer/useFrame loops when they
// are not visible, cutting main-thread work without visible changes.
export function useAnimationPaused<T extends HTMLElement>(
  rootMargin = "120px 0px"
) {
  const ref = useRef<T | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = false;
    let visible = document.visibilityState === "visible";

    const update = () => setPaused(!(inView && visible));

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { rootMargin });

    io.observe(el);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      update();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Fire an initial pass so first-paint state is correct immediately.
    io.unobserve(el);
    inView = (el.getBoundingClientRect().top < window.innerHeight + 120 &&
      el.getBoundingClientRect().bottom > -120);
    io.observe(el);
    update();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [rootMargin]);

  return { ref, paused };
}