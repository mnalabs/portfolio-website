# Motion — therawmaterials.com

## Scroll
- **No smooth-scroll library.** Native `overflow-y:auto` scroller (`.content`); wheel/touch are browser-native. Library inventory from bundle: gsap 3.11.5, ScrollTrigger (only `ScrollTrigger.create` plumbing), ScrollToPlugin, lottie-web. `window.lenis` absent, no `lenis` class.
- Programmatic scroll (sidebar nav / mobile nav): `gsap.to(content, {scrollTo: target.offsetTop, duration})` via ScrollToPlugin.
- Active section is derived from scroll position (section top/bottom markers `.section-start` / `.section-end`); sidebar highlights the active item (dot appears: `.nav-dot` opacity 0→1) and expands it.

## Intro (page load)
1. `#f4e9e1` full-screen `.transition` panel shows a 1px horizontal line (`#242320`, 0.8 opacity) centered vertically — the `.bar` grows `width: 0 → 100vw` (~0.8s).
2. Panel retracts (transform-origin right) and the logo lottie (a random one of 10 `RM_*_Lottie.json`) plays: a rounded black pill grows/morphs into the logotype over ~2s, settling at the landing card; header row fades in.
3. Content wrapper: `fromTo({autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:2})`; a 4s `setTimeout` finishes the intro state.
Rebuild: GSAP timeline — bar width 0→100% (0.8s `power2.inOut`), panel `scaleX 1→0` (0.8s `expo.inOut`), pill placeholder morphing to logo box (1.6s), content fade/translate 20px (2s `power2.out`).

## Sidebar nav
- Item hover/active: `transition: background .3s, border .3s, color .3s, filter .3s ease-in-out`.
- Active item height tween: `to(item,{height: maxHeight, duration:.5, overwrite:true})`, label/number tween with `ease:"back.out"` `y:"120%"→0`, 0.1s.
- Mobile nav items `transition: width .5s ease-out`.

## Marquee / dividers
- `.divider-alt` text row: `fromTo(x:"0%", x:"-33.333%", {repeat:-1, duration:12, ease:"none"})` (content tripled).
- Dividers show animated arrow lottie triplets left/right (3×19×60px each); placeholder: three chevrons stepping opacity (stagger 0.15s, 1.2s loop).

## Hover
- **Case-study preview card**: letters split; on mouseenter `to(letters,{stagger:{each:.02,from:"start",ease:"back.out"},duration:.3,ease:"back.out",transform:"rotateX(…)"})`, mouseleave `stagger.from:"end"`, `ease:"circ.out"`, to `rotateX(0)`; card `perspective:3000px; perspective-origin:50% 0`; `height .3s ease-in-out` (11.1vw → open 20.83vw). Open case study: `to(body,{height:"auto"…"circ.in"})`, close `height:0 .5s circ.out`; body gets `greyBackground` class.
- Tabs: titles `to(y:"120%",.1)` then `to(y:0,ease:"back.out",.1)`; panel crossfade `autoAlpha 0→1 duration .5`.
- Careers rows: height accordion `.3s`.

## Ambient loops (case-study internals — out of placeholder scope but noted)
`sine.inOut` yoyo percentage counters (5s, repeatDelay 1), random-height bars (`height:random(25,100)%`, 3s), random drift for 7-Eleven robots (`duration:6, sine.inOut`).

## Easing/duration summary
`ease-in-out .3s` (hover color/height) · `.5s` (nav height, body bg) · `back.out/circ.out .3s` stagger `.02` (letter flip) · `linear 12s` (marquee) · `2s` intro content · lottie logo ~2–3s.
