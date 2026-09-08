"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    initials: "DR",
    name: "Daniel Reeves",
    role: "COO",
    company: "Summit Logistics Group",
    text: "ApexAutosoft rebuilt our dispatch workflow and automated the follow-ups our team used to handle by hand. What once took most of the morning now runs on its own, with a weekly report showing exactly what went out and what came back. Communication was fast and clear from start to finish.",
    rating: 5,
  },
  {
    initials: "MG",
    name: "Melissa Grant",
    role: "Founder",
    company: "BrightPath Dental",
    text: "Our front desk was losing hours every week to appointment reminders and insurance follow-ups. The team automated the whole process with SMS and AI voice calls, and no-shows dropped noticeably within the first month. They explained every step along the way and delivered ahead of schedule.",
    rating: 5,
  },
  {
    initials: "TM",
    name: "Tyler Morgan",
    role: "VP of Sales",
    company: "Clearview Realty",
    text: "We wanted AI agents that could qualify inbound leads after hours. ApexAutosoft built exactly that, and the handoff is seamless — the system books meetings and updates our CRM before we even look at it. Reliable, well documented, and the team still checks in to make sure everything runs smoothly.",
    rating: 5,
  },
  {
    initials: "PN",
    name: "Priya Natarajan",
    role: "Operations Director",
    company: "Northline E-Commerce",
    text: "Order fulfillment and support tickets used to live in two separate worlds. The automation the team built connects our store, warehouse, and support inbox, so nothing falls through the cracks anymore. The quality of the work was impressive, and they were patient getting our staff up to speed.",
    rating: 5,
  },
  {
    initials: "CB",
    name: "Chris Baldwin",
    role: "Managing Partner",
    company: "Harborview Financial",
    text: "We hired ApexAutosoft to build a client portal with automated document collection, and the final product was far more polished than we expected. It sends reminders, flags missing documents, and syncs everything to our CRM. Professional from kickoff to launch.",
    rating: 5,
  },
];

const AUTOPLAY_MS = 4500;
const DESKTOP_GAP = 32;

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
};

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 flex flex-col gap-5 relative group hover:bg-white/[0.07] transition-colors h-full">
      <Quote className="w-8 h-8 text-brand-accent/40 shrink-0" />

      <p className="text-brand-light/80 text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="flex gap-1">
        {Array.from({ length: review.rating }).map((_, j) => (
          <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent text-sm font-bold">
          {review.initials}
        </div>
        <div>
          <p className="text-brand-light font-semibold text-sm">{review.name}</p>
          <p className="text-brand-light/50 text-xs">{review.role}, {review.company}</p>
        </div>
      </div>
    </div>
  );
}

function NavControls({
  count,
  active,
  labelPrefix,
  onSelect,
  onPrev,
  onNext,
}: {
  count: number;
  active: number;
  labelPrefix: string;
  onSelect: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={onPrev}
        aria-label="Previous testimonial"
        className="w-11 h-11 flex items-center justify-center text-brand-light/50 hover:text-brand-accent active:text-brand-accent transition-colors shrink-0"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center justify-center gap-1.5 mx-1">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`${labelPrefix} ${i + 1}`}
            aria-current={active === i ? "true" : undefined}
            className="relative flex items-center justify-center w-11 h-11"
          >
            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${active === i ? "bg-brand-accent" : "bg-white/20"}`} />
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        aria-label="Next testimonial"
        className="w-11 h-11 flex items-center justify-center text-brand-light/50 hover:text-brand-accent active:text-brand-accent transition-colors shrink-0"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [view, setView] = useState(0);
  const [paused, setPaused] = useState(false);
  const [height, setHeight] = useState(0);
  const [railW, setRailW] = useState(0);
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement | null>(null);
  const touchX = useRef<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const h = Math.max(0, ...measureRefs.current.map((el) => el?.offsetHeight ?? 0));
      if (h > 0) setHeight(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const el = railRef.current;
      if (!el) return;
      const w = el.clientWidth;
      setRailW((prev) => (Math.abs(prev - w) > 1 ? w : prev));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    if (isMobile) {
      const t = setInterval(() => {
        setDirection(1);
        setIndex((i) => (i + 1) % REVIEWS.length);
      }, AUTOPLAY_MS);
      return () => clearInterval(t);
    }
    const t = setInterval(() => {
      setView((v) => (v + 1) % 3);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [isMobile, paused, reduceMotion, index, view]);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length);
  }, []);

  const goTo = useCallback((target: number) => {
    const next = (target + REVIEWS.length) % REVIEWS.length;
    setDirection(next > indexRef.current ? 1 : -1);
    setIndex(next);
  }, []);

  const nextView = useCallback(() => setView((v) => (v + 1) % 3), []);
  const prevView = useCallback(() => setView((v) => (v + 2) % 3), []);

  const cardW = railW > 0 ? (railW - 2 * DESKTOP_GAP) / 3 : 0;
  const step = cardW + DESKTOP_GAP;

  return (
    <section className="py-24 md:py-32 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-brand-accent text-xs font-semibold tracking-widest mb-4">
            CLIENT REVIEWS
          </p>
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-brand-light leading-tight">
            TRUSTED BY BUSINESSES
          </h2>
        </motion.div>

        {/* Desktop: sliding window carousel, 3 cards visible */}
        <div
          className="hidden md:block relative overflow-hidden select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
            setPaused(true);
          }}
          onTouchEnd={(e) => {
            if (touchX.current !== null) {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) {
                if (dx < 0) nextView();
                else prevView();
              }
            }
            touchX.current = null;
            setPaused(false);
          }}
          onTouchCancel={() => {
            touchX.current = null;
            setPaused(false);
          }}
        >
          <div ref={railRef} className="overflow-hidden">
            <motion.div
              className="flex"
              style={{ gap: DESKTOP_GAP }}
              animate={{ x: -view * step }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {REVIEWS.map((review) => (
                <div key={review.name} className="shrink-0 h-full" style={{ width: cardW || undefined }}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </motion.div>
          </div>

          <NavControls
            count={3}
            active={view}
            labelPrefix="Go to view"
            onSelect={setView}
            onPrev={prevView}
            onNext={nextView}
          />
        </div>

        {/* Mobile: single card carousel */}
        <div className="md:hidden">
          <div
            className="relative overflow-hidden select-none"
            style={{ height: height || "auto", touchAction: "pan-y" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
              setPaused(true);
            }}
            onTouchEnd={(e) => {
              if (touchX.current !== null) {
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 40) paginate(dx < 0 ? 1 : -1);
              }
              touchX.current = null;
              setPaused(false);
            }}
            onTouchCancel={() => {
              touchX.current = null;
              setPaused(false);
            }}
          >
            <div className="absolute inset-x-0 top-0 invisible pointer-events-none" aria-hidden="true">
              {REVIEWS.map((review, i) => (
                <div key={review.name} ref={(el) => { measureRefs.current[i] = el; }}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <ReviewCard review={REVIEWS[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <NavControls
            count={5}
            active={index}
            labelPrefix="Go to review"
            onSelect={goTo}
            onPrev={() => paginate(-1)}
            onNext={() => paginate(1)}
          />
        </div>
      </div>
    </section>
  );
}
