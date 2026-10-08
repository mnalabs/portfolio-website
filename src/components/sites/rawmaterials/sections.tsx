import {
  ArrowDivider,
  BigDivider,
  CaseCard,
  Labels,
  Marquee,
  Ph,
  SectionDivider,
  SectionIntro,
  Tabs,
  tone,
  type Tone,
} from "./primitives";

export type NavEntry = {
  id: string;
  label: string;
  tone: Tone | "white";
  maxHeight: number;
};

/** maxHeight values = active-state heights measured on the source sidebar. */
export const NAV: NavEntry[] = [
  { id: "top", label: "MNA.", tone: "white", maxHeight: 104 },
  { id: "one", label: "Hello", tone: "orange", maxHeight: 491 },
  { id: "two", label: "Approach", tone: "purple", maxHeight: 368 },
  { id: "three", label: "Work", tone: "black", maxHeight: 248 },
  { id: "four", label: "Skills", tone: "blue", maxHeight: 318 },
  { id: "five", label: "Open", tone: "red", maxHeight: 192 },
  { id: "six", label: "Contact", tone: "yellow", maxHeight: 220 },
  { id: "seven", label: "Notes", tone: "green", maxHeight: 159 },
];

const LOREM = "Designing and building digital products that look sharp and work properly.";

const STATEMENTS = [
  "Great products start with clear thinking.",
  "Design and engineering belong together, so I own both and ship work that holds up.",
  "Details are where trust is built, so I sweat the spacing, motion and performance too.",
];
const STATEMENT_ONE_SHORT = "Design tools and code are one craft. I move between both without losing intent.";
const STATEMENT_ONE_LONG =
  "Notes on design, development and the small decisions behind good products. Writing is coming soon, check back.";

function Statements({ t, label, n, lines = STATEMENTS }: { t: Tone; label: string; n: string; lines?: string[] }) {
  return (
    <div className={`block text-block ${tone(t)}`}>
      {lines.map((l, i) => (
        <h2 className="t" key={i}>
          <span className="num-chip">
            0{i + 1}
          </span>
          {l}
        </h2>
      ))}
      <Labels title={label} count={n} light />
    </div>
  );
}

const MISSION_TEXTS = [
  "Help founders and teams turn rough ideas into products people understand on first use and keep using.",
  "Design interfaces with intention, build them in modern web technology, and keep refining them after launch using real feedback from real people, every single week.",
  "Keep things simple, fast and accessible so the product works for everyone, on every device, everywhere.",
];

function Mission({ rows }: { rows: number }) {
  return (
    <div className="block" style={{ paddingBottom: "4vw" }}>
      <div className="rows">
        {Array.from({ length: rows }).map((_, i) => (
          <div className="row" key={i}>
            <div className="cell-label">{["My mission", "Focus", "Promise"][i] ?? ""}</div>
            <div className="cell-text">
              <span className="num-chip">0{i + 1}</span>
              <div>{MISSION_TEXTS[i % MISSION_TEXTS.length]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Landing() {
  return (
    <div className="landing" id="top">
      <div className="landing-header">
        <p>
          MNA.
          <br />
          Portfolio
        </p>
        <p>
          Product Designer
          <br />
          &amp; Developer
        </p>
      </div>
      <div className="landing-logo">
        <div className="logo-ph" data-logo aria-label="MNA." role="img">
          MNA.
        </div>
      </div>
    </div>
  );
}

export function SectionOne() {
  const t: Tone = "orange";
  return (
    <section className="rm-section" id="one">
      <SectionDivider t={t} name="Hello" index="01" />
      <SectionIntro t={t} num="01" name="Hello" />
      <div className="block title-block">
        <div className="titles">
          <h2 className="t">Hello,</h2>
          <h2 className="t right" style={{ color: "var(--orange)" }}>
            I&apos;m
          </h2>
          <h2 className="t" style={{ color: "var(--orange)" }}>
            MNA.
          </h2>
        </div>
        <p className="small">{LOREM}</p>
        <Labels title="Hello" count="01 / 02" />
      </div>
      <Statements t={t} label="Hello" n="01 / 03" />
      <div className="block" style={{ position: "relative" }}>
        <Mission rows={3} />
        <Labels title="Hello" count="01 / 04" />
      </div>
      <div className={`block wins-block ${tone(t)}`}>
        <Ph label="Video" light />
        <h2 className="wins">Good Work</h2>
        <Labels title="Hello" count="01 / 05" light />
      </div>
      <ArrowDivider t={t} text="Design and build products people actually enjoy using" />
      <div className="people-row">
        {["Step One", "Step Two", "Step Three"].map((r, i) => (
          <div className="people-card" key={r}>
            <h3>{r}</h3>
            <Ph label="Video" />
            <h4 style={{ color: "var(--orange)" }}>{["Design", "Build", "Ship"][i]}</h4>
          </div>
        ))}
      </div>
      <Marquee text="MNA. — Product Designer &amp; Developer — Open to new projects —" />
      <div className="quotes">
        {[
          ["Principle 01", "Simple beats clever. If a feature needs a manual, it needs another round of design before it ships to anyone."],
          ["Principle 02", "Ship early and learn fast. Real feedback from real users beats a perfect plan made in isolation, every time."],
        ].map(([h, q]) => (
          <div className="block quote bg-black fg-light" key={h}>
            <div>
              <p>{h}</p>
              <p style={{ marginTop: 12, opacity: 0.7 }}>MNA.</p>
            </div>
            <blockquote>{q}</blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionTwo() {
  const t: Tone = "purple";
  const tabs = [
    { title: "Discover", body: "We start by listening. Goals, users and constraints get mapped before a single pixel is drawn, so the work solves the right problem." },
    { title: "Design", body: "Sketches become prototypes, prototypes become polished interfaces. Every choice is tested against the goal and the people using it." },
    { title: "Deliver", body: "Production-ready code, clean handoff and honest iteration. Launch is the start of learning, not the end of the project." },
  ];
  const cap = [
    ["Design", "Product Design", "Design Systems", "Prototyping"],
    ["Product", "Product Thinking", "User Research", "Roadmapping"],
    ["Technology", "Front-End Development", "Next.js & React", "Accessibility"],
  ];
  return (
    <section className="rm-section" id="two">
      <SectionDivider t={t} name="Approach" index="02" />
      <SectionIntro t={t} num="02" name="Approach" />
      <div className={`block media-block ${tone(t)}`} style={{ aspectRatio: "1163 / 288" }}>
        <Ph label="Image" light className="" />
        <Ph label="Image" light />
        <Labels title="Approach" count="02 / 02" light />
      </div>
      <Mission rows={3} />
      <BigDivider t={t} text="Clear Thinking" />
      <BigDivider t={t} text="Careful Craft" variant="alt-a" />
      <BigDivider t={t} text="Honest Delivery" variant="alt-b" />
      <ArrowDivider t={t} text="A simple process that keeps projects moving" />
      <Tabs items={tabs} />
      <BigDivider t={t} text="Always Learning" />
      <div className="caps">
        {cap.map(([h, ...li], i) => (
          <div className="cap" key={h}>
            <span className="num-chip" style={{ position: "static", width: "2.67vw", height: "1.5vw", fontSize: "0.97vw" }}>
              0{i + 1}
            </span>
            <h3>{h}</h3>
            <ul>
              {li.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionThree() {
  const t: Tone = "black";
  const cases: [string, string, boolean][] = [
    ["Case Study 01", "Product design · Coming soon", true],
    ["Case Study 02", "Front-end build · Coming soon", true],
    ["Case Study 03", "Design system · Coming soon", true],
    ["Case Study 04", "Prototype · Coming soon", true],
    ["Case Study 05", "Coming soon", false],
    ["Case Study 06", "Coming soon", false],
    ["Case Study 07", "Coming soon", false],
    ["Case Study 08", "Coming soon", false],
  ];
  return (
    <section className="rm-section" id="three">
      <SectionDivider t={t} name="Work" index="03" />
      <SectionIntro t={t} num="03" name="Work" />
      {cases.map(([n, m, c]) => (
        <CaseCard key={n} name={n} meta={m} clickable={c} />
      ))}
    </section>
  );
}

export function SectionFour() {
  const t: Tone = "blue";
  const tabs = [
    { title: "Design", body: "Interface design, design systems, prototyping and motion, built in Figma and refined in the browser." },
    { title: "Code", body: "React, Next.js, TypeScript and modern CSS, with a focus on performance, accessibility and maintainable structure." },
    { title: "Product", body: "Product thinking, user flows and rapid iteration, from first sketch through to a live, measured release." },
  ];
  return (
    <section className="rm-section" id="four">
      <SectionDivider t={t} name="Skills" index="04" />
      <SectionIntro t={t} num="04" name="Skills" />
      <div className={`block media-full rotate ${tone(t)}`}>
        <Ph label="Video" light />
        <Labels title="Skills" count="04 / 02" light />
      </div>
      <Statements t={t} label="Skills" n="04 / 03" lines={[STATEMENT_ONE_SHORT]} />
      <div className="block talent-title">
        <h2>Tools &amp; Craft</h2>
        <Ph label="Image" />
        <Ph label="Image" />
        <Ph label="Image" />
      </div>
      <ArrowDivider t={t} text="The tools I work with" />
      <Tabs items={tabs} />
    </section>
  );
}

export function SectionFive() {
  const t: Tone = "red";
  const jobs = [
    ["Product Design", "UI, UX and design systems"],
    ["Front-End Development", "React, Next.js and TypeScript"],
    ["Prototyping & Motion", "Interactive prototypes and animation"],
  ];
  return (
    <section className="rm-section" id="five">
      <SectionDivider t={t} name="Open" index="05" />
      <SectionIntro t={t} num="05" name="Open" />
      <div className="block careers-title">
        {["Open", "For", "New", "Projects", "And", "Fresh", "Ideas", "Always"].map((w, i) => (
          <span key={w} className={`pill ${i % 3 === 2 ? "fill" : ""}`}>
            {w}
          </span>
        ))}
        <Labels title="Open" count="05 / 02" />
      </div>
      <ArrowDivider t={t} text="Available services" />
      <div className="careers-list">
        {jobs.map(([j, d]) => (
          <div className="career-row" key={j} tabIndex={0}>
            <h3>{j}</h3>
            <p>{d}. {LOREM}</p>
            <a href="mailto:me.naeem88@gmail.com?subject=Enquiry">Enquire →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionSix() {
  const t: Tone = "yellow";
  return (
    <section className="rm-section" id="six">
      <SectionDivider t={t} name="Contact" index="06" />
      <SectionIntro t={t} num="06" name="Contact" />
      <div className="block title-block">
        <div className="titles">
          <h2 className="t">Let&apos;s</h2>
          <h2 className="t right">Build</h2>
          <h2 className="t">Together.</h2>
        </div>
        <Labels title="Contact" count="06 / 02" />
      </div>
      <div className="contact-people">
        {[
          ["Email", "mailto:me.naeem88@gmail.com"],
          ["GitHub", "https://github.com/mnalabs"],
          ["Say hello", "mailto:me.naeem88@gmail.com"],
        ].map(([c, href]) => (
          <a className="people-card" key={c} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            <h3>{c}</h3>
            <Ph label="" />
          </a>
        ))}
      </div>
      <ArrowDivider t={t} text="me.naeem88@gmail.com" />
    </section>
  );
}

export function SectionSeven() {
  const t: Tone = "green";
  return (
    <section className="rm-section" id="seven">
      <SectionDivider t={t} name="Notes" index="07" />
      <SectionIntro t={t} num="07" name="Notes" />
      <Statements t={t} label="Notes" n="07 / 03" lines={[STATEMENT_ONE_LONG]} />
      <ArrowDivider t={t} text="Stay in the loop" />
      <a className="subscribe" href="mailto:me.naeem88@gmail.com?subject=Hello">
        <span>EMAIL ME</span>
        <span className="field" />
        <span>→</span>
      </a>
    </section>
  );
}
