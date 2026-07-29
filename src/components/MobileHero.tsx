"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NODES = [
  { id: "lead", label: "LEAD", status: "Captured", cx: 55, cy: 55, type: "input" },
  { id: "ai", label: "AI AGENT", status: "Processing", cx: 345, cy: 55, type: "processor" },
  { id: "twilio", label: "TWILIO", status: "Connected", cx: 55, cy: 205, type: "integration" },
  { id: "result", label: "RESULT", status: "Delivered", cx: 345, cy: 205, type: "output" },
];

export default function MobileHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<SVGGElement>(null);
  const outerRingRef = useRef<SVGGElement>(null);
  const innerRingRef = useRef<SVGGElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);
  const dot3Ref = useRef<SVGCircleElement>(null);
  const dot4Ref = useRef<SVGCircleElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const path4Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(coreRef.current, {
        scale: 1.08,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "200px 130px",
      });

      gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
        transformOrigin: "200px 130px",
      });

      gsap.to(innerRingRef.current, {
        rotation: -360,
        duration: 22,
        repeat: -1,
        ease: "none",
        transformOrigin: "200px 130px",
      });

      gsap.fromTo(
        ".mobile-hero-node",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.3 }
      );

      const animateDot = (
        dot: SVGCircleElement | null,
        path: SVGPathElement | null,
        duration: number,
        delay: number
      ) => {
        if (!dot || !path) return;
        const length = path.getTotalLength();
        const state = { progress: 0 };

        gsap.to(state, {
          progress: 1,
          duration,
          ease: "none",
          repeat: -1,
          delay,
          onUpdate: () => {
            const point = path.getPointAtLength(state.progress * length);
            dot.setAttribute("cx", String(point.x));
            dot.setAttribute("cy", String(point.y));
          },
        });
      };

      animateDot(dot1Ref.current, path1Ref.current, 3.5, 0.5);
      animateDot(dot2Ref.current, path2Ref.current, 3, 1.0);
      animateDot(dot3Ref.current, path3Ref.current, 4, 1.5);
      animateDot(dot4Ref.current, path4Ref.current, 3.2, 2.0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nodeFill = (type: string) =>
    type === "processor" ? "#7DA88D" : "#182019";

  const labelX = (cx: number) => (cx < 200 ? cx + 18 : cx - 18);
  const textAnchor = (cx: number) => (cx < 200 ? "start" : "end");

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 260"
        className="w-full h-full max-w-[400px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="coreGlowMobile" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7DA88D" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7DA88D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle grid */}
        <g opacity="0.025">
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 20}
              x2="400"
              y2={i * 20}
              stroke="#182019"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 21 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 20}
              y1="0"
              x2={i * 20}
              y2="260"
              stroke="#182019"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Core glow */}
        <circle cx="200" cy="130" r="70" fill="url(#coreGlowMobile)" />

        {/* Rotating rings */}
        <g ref={outerRingRef}>
          <circle
            cx="200"
            cy="130"
            r="44"
            fill="none"
            stroke="#7DA88D"
            strokeOpacity="0.2"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </g>
        <g ref={innerRingRef}>
          <circle
            cx="200"
            cy="130"
            r="30"
            fill="none"
            stroke="#7DA88D"
            strokeOpacity="0.15"
            strokeWidth="0.8"
            strokeDasharray="3 5"
          />
        </g>

        {/* Core center */}
        <g ref={coreRef}>
          <circle cx="200" cy="130" r="14" fill="#7DA88D" opacity="0.9" />
          <circle cx="200" cy="130" r="5" fill="#F5F4EF" opacity="0.8" />
        </g>

        {/* Connection paths */}
        <path
          ref={path1Ref}
          d="M 55 55 C 100 55, 150 90, 195 125"
          fill="none"
          stroke="#7DA88D"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
        <path
          ref={path2Ref}
          d="M 345 55 C 300 55, 250 90, 205 125"
          fill="none"
          stroke="#7DA88D"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
        <path
          ref={path3Ref}
          d="M 55 205 C 100 205, 150 170, 195 135"
          fill="none"
          stroke="#7DA88D"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
        <path
          ref={path4Ref}
          d="M 345 205 C 300 205, 250 170, 205 135"
          fill="none"
          stroke="#7DA88D"
          strokeOpacity="0.15"
          strokeWidth="1"
        />

        {/* Data particles */}
        <circle ref={dot1Ref} r="3" fill="#7DA88D" opacity="0.8" />
        <circle ref={dot2Ref} r="3" fill="#7DA88D" opacity="0.8" />
        <circle ref={dot3Ref} r="3" fill="#7DA88D" opacity="0.8" />
        <circle ref={dot4Ref} r="3" fill="#7DA88D" opacity="0.8" />

        {/* Nodes */}
        {NODES.map((node) => (
          <g key={node.id} className="mobile-hero-node">
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.type === "processor" ? 11 : 8}
              fill={nodeFill(node.type)}
            />
            {node.type === "processor" && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={11}
                fill="none"
                stroke="#7DA88D"
                strokeWidth="1.5"
                opacity="0.5"
              />
            )}
            <text
              x={labelX(node.cx)}
              y={node.cy - 2}
              textAnchor={textAnchor(node.cx)}
              fill="#182019"
              fontSize="9"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="0.1em"
            >
              {node.label}
            </text>
            <text
              x={labelX(node.cx)}
              y={node.cy + 10}
              textAnchor={textAnchor(node.cx)}
              fill="#182019"
              fillOpacity="0.4"
              fontSize="7"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="500"
            >
              {node.status}
            </text>
            <circle cx={node.cx} cy={node.cy} r="2" fill={nodeFill(node.type)} opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.5;0.2;0.5"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
