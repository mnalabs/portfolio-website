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
import "./rawmaterials.css";

gsap.registerPlugin(ScrollToPlugin);

const IDS = NAV.map((n) => n.id);

export function RawMaterialsPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);

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
    if (!c) return;
    const probe = c.scrollTop + c.clientHeight * 0.35;
    let idx = 0;
    IDS.forEach((id, i) => {
      const el = c.querySelector<HTMLElement>(`#${id}`);
      if (el && el.offsetTop - c.offsetTop <= probe) idx = i;
    });
    setActive((a) => (a === idx ? a : idx));
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
    gsap.to(c, { scrollTo: { y: el.offsetTop - c.offsetTop, autoKill: true }, duration: 1.2, ease: "power2.inOut" });
  };

  const navItems = (mobile: boolean) =>
    NAV.map((n, i) => (
      <button
        key={n.id}
        ref={(el) => {
          if (!mobile) itemRefs.current[i] = el;
        }}
        className={`nav-item ${n.tone === "white" ? "bg-white fg-dark" : tone(n.tone)} ${active === i ? "active" : ""}`}
        onClick={() => goTo(i)}
        aria-current={active === i ? "true" : undefined}
      >
        <span className="nav-item-number">0{i}</span>
        <span className="nav-item-text">
          <span
            ref={(el) => {
              if (!mobile) labelRefs.current[i] = el;
            }}
          >
            {n.label}
          </span>
        </span>
        {!mobile && <span className="nav-dot" />}
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
        {navItems(true)}
      </nav>
      <div className="rm-content" ref={contentRef} onScroll={onScroll}>
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
