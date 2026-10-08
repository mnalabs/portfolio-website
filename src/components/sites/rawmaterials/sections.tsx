import {
  ArrowDivider,
  BigDivider,
  Block,
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
  { id: "top", label: "Brand Name", tone: "white", maxHeight: 104 },
  { id: "one", label: "Section One", tone: "orange", maxHeight: 491 },
  { id: "two", label: "Section Two", tone: "purple", maxHeight: 368 },
  { id: "three", label: "Section Three", tone: "black", maxHeight: 248 },
  { id: "four", label: "Section Four", tone: "blue", maxHeight: 318 },
  { id: "five", label: "Section Five", tone: "red", maxHeight: 192 },
  { id: "six", label: "Section Six", tone: "yellow", maxHeight: 220 },
  { id: "seven", label: "Section Seven", tone: "green", maxHeight: 159 },
];

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.";
const LOREM_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.";

const STATEMENTS = [
  "Lorem ipsum dolor sit amet consectetur elit.",
  "Eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
];
const STATEMENT_ONE_SHORT = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.";
const STATEMENT_ONE_LONG =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.";

function Statements({ t, label, n, lines = STATEMENTS }: { t: Tone; label: string; n: string; lines?: string[] }) {
  return (
    <div className={`block text-block ${tone(t)}`}>
      {lines.map((l, i) => (
        <h2 className="t" key={i}>
          <span className="num-chip" style={{ color: "var(--ink)" }}>
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
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.",
  "Eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
];

function Mission({ rows }: { rows: number }) {
  return (
    <div className="block" style={{ paddingBottom: "4vw" }}>
      <div className="rows">
        {Array.from({ length: rows }).map((_, i) => (
          <div className="row" key={i}>
            <div className="cell-label">{i === 0 ? "Label placeholder" : ""}</div>
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
          Brand
          <br />
          Name
        </p>
        <p>
          Tagline goes
          <br />
          right here
        </p>
      </div>
      <div className="landing-logo">
        <div className="logo-ph" data-logo aria-label="Logo placeholder" role="img">
          LOGO
        </div>
      </div>
    </div>
  );
}

export function SectionOne() {
  const t: Tone = "orange";
  return (
    <section className="rm-section" id="one">
      <SectionDivider t={t} name="One" index="01" />
      <SectionIntro t={t} num="01" name="One" />
      <div className="block title-block">
        <div className="titles">
          <h2 className="t">Title Line</h2>
          <h2 className="t right" style={{ color: "var(--orange)" }}>
            Second
          </h2>
          <h2 className="t" style={{ color: "var(--orange)" }}>
            Third Line
          </h2>
        </div>
        <p className="small">{LOREM}</p>
        <Labels title="One" count="01 / 02" />
      </div>
      <Statements t={t} label="One" n="01 / 03" />
      <div className="block" style={{ position: "relative" }}>
        <Mission rows={3} />
        <Labels title="One" count="01 / 04" />
      </div>
      <div className={`block wins-block ${tone(t)}`}>
        <Ph label="Video" light />
        <h2 className="wins">Big Words</h2>
        <Labels title="One" count="01 / 05" light />
      </div>
      <ArrowDivider t={t} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"} />
      <div className="people-row">
        {["Role Title One", "Role Title Two", "Role Title Three"].map((r, i) => (
          <div className="people-card" key={r}>
            <h3>{r}</h3>
            <Ph label="Video" />
            <h4 style={{ color: "var(--orange)" }}>Person {i + 1}</h4>
          </div>
        ))}
      </div>
      <Marquee text={LOREM} />
      <div className="quotes">
        {["Client One", "Client Two"].map((c) => (
          <div className="block quote bg-black fg-light" key={c}>
            <div>
              <Ph label="Logo" className="logo-sm" light />
              <p style={{ marginTop: 12, opacity: 0.7 }}>Project description</p>
            </div>
            <blockquote>“{LOREM_LONG}”</blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionTwo() {
  const t: Tone = "purple";
  const tabs = [
    { title: "Tab One", body: LOREM_LONG },
    { title: "Tab Two", body: LOREM },
    { title: "Tab Three", body: LOREM_LONG },
  ];
  const cap = [
    ["Group One", "Capability line one", "Capability line two", "Capability line three"],
    ["Group Two", "Capability line one", "Capability line two", "Capability line three"],
    ["Group Three", "Capability line one", "Capability line two", "Capability line three"],
  ];
  return (
    <section className="rm-section" id="two">
      <SectionDivider t={t} name="Two" index="02" />
      <SectionIntro t={t} num="02" name="Two" />
      <div className={`block media-block ${tone(t)}`} style={{ aspectRatio: "1163 / 288" }}>
        <Ph label="Image" light className="" />
        <Ph label="Image" light />
        <Labels title="Two" count="02 / 02" light />
      </div>
      <Mission rows={3} />
      <BigDivider t={t} text="Big Line One" />
      <BigDivider t={t} text="Big Line Two" variant="alt-a" />
      <BigDivider t={t} text="Big Line Three" variant="alt-b" />
      <ArrowDivider t={t} text="Lorem ipsum dolor sit amet consectetur" />
      <Tabs items={tabs} />
      <BigDivider t={t} text="Big Line Four" />
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
    ["Project One", "Category · Short description placeholder", true],
    ["Project Two", "Category · Short description placeholder", true],
    ["Project Three", "Category · Short description placeholder", true],
    ["Project Four", "Category · Short description placeholder", true],
    ["Project Five", "Category · Contact to see", false],
    ["Project Six", "Coming soon", false],
    ["Project Seven", "Coming soon", false],
    ["Project Eight", "Coming soon", false],
  ];
  return (
    <section className="rm-section" id="three">
      <SectionDivider t={t} name="Three" index="03" />
      <SectionIntro t={t} num="03" name="Three" />
      {cases.map(([n, m, c]) => (
        <CaseCard key={n} name={n} meta={m} clickable={c} />
      ))}
    </section>
  );
}

export function SectionFour() {
  const t: Tone = "blue";
  const tabs = [
    { title: "Tab One", body: LOREM_LONG },
    { title: "Tab Two", body: LOREM },
    { title: "Tab Three", body: LOREM_LONG },
  ];
  return (
    <section className="rm-section" id="four">
      <SectionDivider t={t} name="Four" index="04" />
      <SectionIntro t={t} num="04" name="Four" />
      <div className={`block media-full rotate ${tone(t)}`}>
        <Ph label="Video" light />
        <Labels title="Four" count="04 / 02" light />
      </div>
      <Statements t={t} label="Four" n="04 / 03" lines={[STATEMENT_ONE_SHORT]} />
      <div className="block talent-title">
        <h2>Heading Words</h2>
        <Ph label="Image" />
        <Ph label="Image" />
        <Ph label="Image" />
      </div>
      <ArrowDivider t={t} text="Short divider text" />
      <Tabs items={tabs} />
    </section>
  );
}

export function SectionFive() {
  const t: Tone = "red";
  const jobs = [
    ["Job Title One", "Department placeholder"],
    ["Job Title Two", "Department placeholder"],
    ["Job Title Three", "Department placeholder"],
  ];
  return (
    <section className="rm-section" id="five">
      <SectionDivider t={t} name="Five" index="05" />
      <SectionIntro t={t} num="05" name="Five" />
      <div className="block careers-title">
        {["We", "Are", "Lorem", "Ipsum", "Dolor", "Sit", "Amet", "Elit"].map((w, i) => (
          <span key={w} className={`pill ${i % 3 === 2 ? "fill" : ""}`}>
            {w}
          </span>
        ))}
        <Labels title="Five" count="05 / 02" />
      </div>
      <ArrowDivider t={t} text="List divider" />
      <div className="careers-list">
        {jobs.map(([j, d]) => (
          <div className="career-row" key={j} tabIndex={0}>
            <h3>{j}</h3>
            <p>{d}. {LOREM}</p>
            <span>Apply →</span>
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
      <SectionDivider t={t} name="Six" index="06" />
      <SectionIntro t={t} num="06" name="Six" />
      <div className="block title-block">
        <div className="titles">
          <h2 className="t">Big</h2>
          <h2 className="t right">Heading</h2>
          <h2 className="t">Words.</h2>
        </div>
        <Labels title="Six" count="06 / 02" />
      </div>
      <div className="contact-people">
        {["Contact One", "Contact Two", "Contact Three"].map((c) => (
          <div className="people-card" key={c}>
            <h3>{c}</h3>
            <Ph label="Video" />
          </div>
        ))}
      </div>
      <ArrowDivider t={t} text="Short divider text" />
    </section>
  );
}

export function SectionSeven() {
  const t: Tone = "green";
  return (
    <section className="rm-section" id="seven">
      <SectionDivider t={t} name="Seven" index="07" />
      <SectionIntro t={t} num="07" name="Seven" />
      <Statements t={t} label="Seven" n="07 / 03" lines={[STATEMENT_ONE_LONG]} />
      <ArrowDivider t={t} text="Subscribe divider text" />
      <div className="subscribe">
        <span>SUBSCRIBE</span>
        <span className="field" />
        <span>→</span>
      </div>
    </section>
  );
}
