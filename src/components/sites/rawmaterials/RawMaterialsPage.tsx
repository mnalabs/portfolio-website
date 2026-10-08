"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Landing,
  NAV,
  SectionFive,
  SectionFour,
  SectionOne,
  SectionSeven,
  SectionSix,
  SectionThree,
  SectionTwo,
} from "./sections";
import { tone } from "./primitives";
import { ROUTE_SLUGS } from "./routes";
import "./rawmaterials.css";

gsap.registerPlugin(ScrollToPlugin);

const IDS = NAV.map((n) => n.id);

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* On phones/tablets the document itself scrolls (so iOS Safari/Chrome can collapse their toolbars);
   on desktop the inner .rm-content panel scrolls. */
const DOC_SCROLL_MQ = "(max-width: 1023px)";
const isDocScroll = () => window.matchMedia(DOC_SCROLL_MQ).matches;
const scrollerOf = (content: HTMLElement | null): HTMLElement | null =>
  isDocScroll() ? (document.scrollingElement as HTMLElement | null) : content;
const sectionTop = (el: HTMLElement, content: HTMLElement) =>
  isDocScroll() ? el.getBoundingClientRect().top + window.scrollY : el.offsetTop - content.offsetTop;

/* Mobile bottom nav card widths (px), measured on the source: a to-scale scroll strip, one card per section. */
const MNAV_W = [67.6, 319.15, 239.2, 161.2, 206.7, 124.8, 143, 103.35];

export function RawMaterialsPage({ initialIndex = 0 }: { initialIndex?: number }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mnavRef = useRef<HTMLDivElement>(null);
  const mnavDriving = useRef(false); /* true while the visitor drags the bottom nav strip */
  const [active, setActive] = useState(initialIndex);

  /* open at the routed section (instant, before the intro reveals the page) */
  useEffect(() => {
    const c = contentRef.current;
    if (!c || initialIndex === 0) return;
    let touched = false;
    const place = () => {
      const el = c.querySelector<HTMLElement>(`#${IDS[initialIndex]}`);
      const sc = scrollerOf(c);
      if (!touched && el && sc) sc.scrollTop = sectionTop(el, c);
    };
    const stop = () => {
      touched = true;
    };
    place();
    /* page height can still change while fonts/media load; keep the target until the visitor scrolls */
    document.fonts?.ready.then(place);
    window.addEventListener("load", place);
    const ro = new ResizeObserver(place);
    Array.from(c.children).forEach((child) => ro.observe(child));
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    events.forEach((e) => c.addEventListener(e, stop, { passive: true }));
    const timer = window.setTimeout(stop, 4000);
    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("load", place);
      events.forEach((e) => c.removeEventListener(e, stop));
    };
  }, [initialIndex]);

  /* keep the URL in step with the active section */
  useEffect(() => {
    const url = `${BASE}/${ROUTE_SLUGS[active]}${active ? "/" : ""}`;
    if (window.location.pathname !== url) window.history.replaceState(null, "", url);
  }, [active]);

  /* ---- intro: bar draws, panel retracts, logo pill morphs, content rises ---- */
  useEffect(() => {
    const content = contentRef.current;
    const overlay = overlayRef.current;
    const bar = barRef.current;
    if (!content || !overlay || !bar) return;
    const logo = content.querySelector<HTMLElement>("[data-logo]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(overlay, { autoAlpha: 0 });
      return;
    }
    gsap.set(content, { autoAlpha: 0, y: 20 });
    const tl = gsap.timeline();
    tl.to(bar, { width: "100%", duration: 0.8, ease: "power2.inOut" })
      .to(overlay, { scaleX: 0, duration: 0.8, ease: "expo.inOut" })
      .set(overlay, { display: "none" })
      .to(content, { autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" }, "<0.1");
    if (logo) {
      tl.fromTo(
        logo,
        { width: "9%", borderTopLeftRadius: 999, borderTopRightRadius: 999, scaleY: 0.5 },
        { width: "100%", borderTopLeftRadius: 24, borderTopRightRadius: 24, scaleY: 1, duration: 1.6, ease: "expo.inOut" },
        "<0.3",
      );
    }
    return () => {
      tl.kill();
    };
  }, []);

  /* ---- active section from scroll position (native scroller, no smooth-scroll lib) ---- */
  const onScroll = useCallback(() => {
    const c = contentRef.current;
    const sc = scrollerOf(c);
    if (!c || !sc) return;
    const probe = sc.scrollTop + sc.clientHeight * 0.35;
    let idx = 0;
    IDS.forEach((id, i) => {
      const el = c.querySelector<HTMLElement>(`#${id}`);
      if (el && sectionTop(el, c) <= probe) idx = i;
    });
    setActive((a) => (a === idx ? a : idx));
    /* scroll-progress dot: top = (100% - 32px) * progress + 16px, as on the source nav */
    const sec = c.querySelector<HTMLElement>(`#${IDS[idx]}`);
    const dot = dotRefs.current[idx];
    if (sec && dot) {
      const start = sectionTop(sec, c);
      const range = Math.max(1, sec.offsetHeight - sc.clientHeight);
      const p = Math.min(1, Math.max(0, (sc.scrollTop - start) / range));
      dot.style.top = `calc((100% - 32px) * ${p} + 16px)`;
    }
    /* mobile bottom nav follows the page scroll (unless the visitor is dragging the strip) */
    const m = mnavRef.current;
    if (m && !mnavDriving.current) {
      const total = Math.max(1, sc.scrollHeight - sc.clientHeight);
      m.scrollLeft = (m.scrollWidth - m.clientWidth) * Math.min(1, Math.max(0, sc.scrollTop / total));
    }
  }, []);

  /* document scroll (phones/tablets) */
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /* dragging the bottom nav strip scrolls the page by the same proportion */
  const onMnavScroll = useCallback(() => {
    const sc = scrollerOf(contentRef.current);
    const m = mnavRef.current;
    if (!sc || !m || !mnavDriving.current) return;
    const span = Math.max(1, m.scrollWidth - m.clientWidth);
    sc.scrollTop = (m.scrollLeft / span) * (sc.scrollHeight - sc.clientHeight);
  }, []);

  /* ---- sidebar accordion: active item grows to maxHeight (0.5s) ---- */
  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { height: i === active ? NAV[i].maxHeight : 104, duration: 0.5, overwrite: true });
    });
    labelRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { y: i === active ? "120%" : 0 }, { y: 0, duration: 0.1, ease: "back.out", delay: 0.1 });
    });
  }, [active]);

  const goTo = (i: number) => {
    const c = contentRef.current;
    const el = c?.querySelector<HTMLElement>(`#${IDS[i]}`);
    if (!c || !el) return;
    mnavDriving.current = false;
    gsap.to(isDocScroll() ? window : c, { scrollTo: { y: sectionTop(el, c), autoKill: true }, duration: 1.2, ease: "power2.inOut" });
  };

  const navItems = (mobile: boolean) =>
    NAV.map((n, i) => (
      <button
        key={n.id}
        ref={(el) => {
          if (!mobile) itemRefs.current[i] = el;
        }}
        className={`nav-item ${n.tone === "white" ? "bg-white fg-dark" : tone(n.tone)} ${active === i ? "active" : ""}`}
        style={mobile ? { width: MNAV_W[i] } : undefined}
        onClick={() => goTo(i)}
        aria-current={active === i ? "true" : undefined}
      >
        <span className="nav-item-number">0{i}</span>
        {(!mobile || i > 0) && (
          <span className="nav-item-text">
            <span
              ref={(el) => {
                if (!mobile) labelRefs.current[i] = el;
              }}
            >
              {n.label}
            </span>
          </span>
        )}
        {!mobile && (
          <span
            className="nav-dot"
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
          />
        )}
      </button>
    ));

  return (
    <div className="rm" data-section={IDS[active]}>
      <div className="rm-transition" ref={overlayRef} aria-hidden>
        <div className="bar" ref={barRef} />
      </div>
      <nav className="rm-nav" ref={navRef} aria-label="Sections">
        {navItems(false)}
      </nav>
      <nav className="rm-mnav" aria-label="Sections">
        <div
          className="mnav-scroll"
          ref={mnavRef}
          onTouchStart={() => {
            mnavDriving.current = true;
          }}
          onScroll={onMnavScroll}
        >
          <div className="mnav-items">{navItems(true)}</div>
        </div>
      </nav>
      <div
        className="rm-content"
        ref={contentRef}
        onScroll={onScroll}
        onTouchStart={() => {
          mnavDriving.current = false;
        }}
        onWheel={() => {
          mnavDriving.current = false;
        }}
      >
        <Landing />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <SectionSix />
        <SectionSeven />
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}
