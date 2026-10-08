"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";

export type Tone = "orange" | "purple" | "black" | "blue" | "red" | "yellow" | "green";

export const TONES: Record<Tone, { fg: "light" | "dark" }> = {
  orange: { fg: "light" },
  purple: { fg: "dark" },
  black: { fg: "light" },
  blue: { fg: "dark" },
  red: { fg: "dark" },
  yellow: { fg: "light" },
  green: { fg: "light" },
};

export function tone(t: Tone) {
  return `bg-${t} fg-${TONES[t].fg}`;
}

/** Image / video placeholder: keeps the box (aspect ratio via parent or `ratio`). */
export function Ph({
  label = "Image",
  ratio,
  className = "",
  light = false,
}: {
  label?: string;
  ratio?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`ph ${light ? "light" : ""} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      role="img"
      aria-label={`${label} placeholder`}
    >
      <span>{label}</span>
    </div>
  );
}

export function Labels({ title, count, light }: { title: string; count: string; light?: boolean }) {
  return (
    <div className="labels" style={light ? { color: "var(--cream)" } : undefined}>
      <div>({title})</div>
      <div>● {count}</div>
    </div>
  );
}

export function SectionDivider({ t, name, index }: { t: Tone; name: string; index: string }) {
  return (
    <div className={`block section-divider ${tone(t)}`}>
      <h2>You are now entering ( {name} ) section</h2>
      <div style={{ color: t === "yellow" || t === "green" ? undefined : "var(--ink)" }}>● {index} / 01</div>
    </div>
  );
}

export function SectionIntro({ t, num, name }: { t: Tone; num: string; name: string }) {
  return (
    <div className={`block section-intro ${tone(t)}`}>
      <div className="num">{num}</div>
      <h1>{name}</h1>
    </div>
  );
}

export function ArrowDivider({ t, text }: { t: Tone; text: string }) {
  const arrows = (side: "left" | "right") => (
    <span className={`arrows ${side}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <i key={i} style={{ ["--i" as string]: side === "left" ? 2 - i : i }} />
      ))}
    </span>
  );
  return (
    <div className={`block divider ${tone(t)}`}>
      {arrows("left")}
      <h2>{text}</h2>
      {arrows("right")}
    </div>
  );
}

/** Infinite marquee: `x 0% → -33.333%`, 12s linear, content tripled. */
export function Marquee({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(ref.current, { x: "0%" }, { x: "-33.333%", repeat: -1, duration: 12, ease: "none" });
    return () => {
      tween.kill();
    };
  }, []);
  return (
    <div className="block marquee" style={{ color: "var(--cream)" }}>
      <div className="marquee-track" ref={ref}>
        {[0, 1, 2].map((i) => (
          <span key={i} aria-hidden={i > 0}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BigDivider({ t, text, variant }: { t: Tone; text: string; variant?: "alt-a" | "alt-b" }) {
  return (
    <div className={`block big-divider ${variant ?? ""} ${tone(t)}`}>
      <span className="tag">(Design)</span>
      <h2 className="t">{text}</h2>
      <span className="tag">(Build)</span>
    </div>
  );
}

export type TabItem = { title: string; body: string };

export function Tabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0);
  const titles = useRef<(HTMLSpanElement | null)[]>([]);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const tl = gsap.timeline();
    tl.to(titles.current, { y: "120%", duration: 0.1 }, 0);
    tl.to(titles.current[active], { y: 0, ease: "back.out", duration: 0.1 }, 0.1);
    tl.to(panels.current, { autoAlpha: 0, duration: 0.5 }, 0);
    tl.to(panels.current[active], { autoAlpha: 1, duration: 0.5 }, 0);
    return () => {
      tl.kill();
    };
  }, [active]);

  return (
    <>
      <div className="block tabbed-block">
        <div className="tabs" role="tablist">
          {items.map((it, i) => (
            <button
              key={it.title}
              role="tab"
              aria-selected={active === i}
              className={`tab ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="tab-title">
                <span
                  ref={(el) => {
                    titles.current[i] = el;
                  }}
                >
                  {it.title}
                </span>
              </span>
              <span className="tab-number">0{i + 1}</span>
            </button>
          ))}
        </div>
        <div className="tab-panels">
          {items.map((it, i) => (
            <div
              key={it.title}
              role="tabpanel"
              className={`tab-panel ${active === i ? "on" : ""}`}
              ref={(el) => {
                panels.current[i] = el;
              }}
            >
              <p>{it.body}</p>
              <Ph label="Image" />
            </div>
          ))}
        </div>
      </div>
      <div className="tabbed-mobile">
        {items.map((it, i) => (
          <div key={it.title}>
            <span>
              {it.title} · 0{i + 1}
            </span>
            <p>{it.body}</p>
            <Ph label="Image" />
          </div>
        ))}
      </div>
    </>
  );
}

/** Case-study preview card: letter-flip hover (stagger .02, back.out in / circ.out out), accordion open. */
export function CaseCard({
  name,
  meta,
  clickable,
  thumbs = 3,
}: {
  name: string;
  meta: string;
  clickable: boolean;
  thumbs?: number;
}) {
  const [open, setOpen] = useState(false);
  const chars = useRef<(HTMLSpanElement | null)[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const flip = (enter: boolean) => {
    if (!clickable) return;
    tl.current?.kill();
    tl.current = gsap.timeline();
    tl.current.to(chars.current, {
      stagger: { each: 0.02, from: enter ? "start" : "end", ease: enter ? "back.out" : "circ.out" },
      duration: 0.3,
      ease: enter ? "back.out" : "circ.out",
      rotateX: enter ? -25 : 0,
    });
  };

  useEffect(() => () => void tl.current?.kill(), []);

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen((o) => !o);
              }
            }
          : undefined
      }
      className={`case-card ${open ? "open" : ""} ${clickable ? "" : "disabled"}`}
      onMouseEnter={() => flip(true)}
      onMouseLeave={() => flip(false)}
      onFocus={() => flip(true)}
      onBlur={() => flip(false)}
      onClick={clickable ? () => setOpen((o) => !o) : undefined}
      aria-expanded={clickable ? open : undefined}
    >
      <div className="case-front">
        <h3 className="name" aria-label={name}>
          {Array.from(name).map((c, i) => (
            <span
              key={i}
              className="ch"
              aria-hidden
              ref={(el) => {
                chars.current[i] = el;
              }}
            >
              {c}
            </span>
          ))}
        </h3>
        <div className="thumbs">
          {Array.from({ length: thumbs }).map((_, i) => (
            <Ph key={i} label="" light />
          ))}
        </div>
        <p className="meta">{meta}</p>
      </div>
      {clickable && (
        <div className="case-body" aria-hidden={!open}>
          <Ph label="Case media" light />
          <Ph label="Case media" light />
        </div>
      )}
    </div>
  );
}

export function Block({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`block ${className}`}>{children}</div>;
}
