import { useEffect, useMemo, useState } from "react";

const defaultHeroLines = [
  "EST. 2026 | MCA Student Portfolio",
  "Cloud Computing | Networking | AI Systems",
  "Software Testing | Full Stack Development",
  "Building practical projects with real impact",
];

export default function HomeSection({ portfolio, setSectionRef }) {
  const heroLines = portfolio.heroLines?.length
    ? portfolio.heroLines
    : defaultHeroLines;
  const tickerLines = useMemo(() => heroLines.filter(Boolean), [heroLines]);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    if (tickerLines.length <= 1) {
      return undefined;
    }

    const tickerTimer = window.setInterval(() => {
      setTickerIndex((currentIndex) => (currentIndex + 1) % tickerLines.length);
    }, 2900);

    return () => {
      window.clearInterval(tickerTimer);
    };
  }, [tickerLines]);

  const activeLine = tickerLines[tickerIndex] ?? defaultHeroLines[0];
  const resumeUrl = "/images/Xavier_Amith_Resume.pdf";

  return (
    <section
      id="home"
      ref={setSectionRef("home")}
      className="hero-section hero-cyber-section scroll-mt-24"
      data-section
    >
      <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="hero-cyber-stage">
          <div className="hero-cyber-stars" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, index) => (
              <span
                key={index}
                className="hero-cyber-star"
                style={{ "--star-index": index }}
              />
            ))}
          </div>

          <div className="hero-cyber-network-lines" aria-hidden="true">
            <span className="hero-cyber-link-line hero-cyber-link-line-one" />
            <span className="hero-cyber-link-line hero-cyber-link-line-two" />
            <span className="hero-cyber-link-line hero-cyber-link-line-three" />
          </div>

          <div className="hero-cyber-nodes" aria-hidden="true">
            <span className="hero-cyber-node hero-cyber-node-one" />
            <span className="hero-cyber-node hero-cyber-node-two" />
            <span className="hero-cyber-node hero-cyber-node-three" />
            <span className="hero-cyber-node hero-cyber-node-four" />
          </div>

          <span
            className="hero-cyber-orbit hero-cyber-orbit-left"
            aria-hidden="true"
          />
          <span
            className="hero-cyber-orbit hero-cyber-orbit-right"
            aria-hidden="true"
          />
          <span
            className="hero-cyber-sweep hero-cyber-sweep-left"
            aria-hidden="true"
          />
          <span
            className="hero-cyber-sweep hero-cyber-sweep-right"
            aria-hidden="true"
          />

          <span className="hero-cyber-lightning" aria-hidden="true">
            <svg viewBox="0 0 90 90" className="hero-cyber-svg">
              <path d="M53 6 27 44h16l-6 40 27-39H48z" />
            </svg>
          </span>

          <article
            className="hero-cyber-card hero-cyber-card-monitor"
            aria-hidden="true"
          >
            <p className="hero-cyber-card-label">Analytics</p>
            <svg
              viewBox="0 0 260 150"
              className="hero-cyber-svg hero-cyber-svg-chart"
            >
              <path d="M14 132h232" />
              <path d="M38 118V82M84 118V56M130 118V70M176 118V44M222 118V66" />
              <path d="M26 106 72 92l48-26 48 8 56-38" />
              <circle cx="72" cy="92" r="4" />
              <circle cx="120" cy="66" r="4" />
              <circle cx="168" cy="74" r="4" />
              <circle cx="224" cy="36" r="4" />
            </svg>
          </article>

          <article
            className="hero-cyber-card hero-cyber-card-laptop"
            aria-hidden="true"
          >
            <p className="hero-cyber-card-label">Coding & Debugging</p>
            <svg
              viewBox="0 0 280 170"
              className="hero-cyber-svg hero-cyber-svg-code"
            >
              <rect x="16" y="22" width="248" height="112" rx="12" />
              <path d="m76 66-22 18 22 18M114 66l22 18-22 18M168 90h44" />
              <path d="m178 50 7-6 9 2 4 8-4 8-9 2-7-6-7 6-9-2-4-8 4-8 9-2z" />
              <circle cx="182" cy="54" r="4" />
              <path d="M52 146h176" />
            </svg>
          </article>

          <article
            className="hero-cyber-card hero-cyber-card-cloud"
            aria-hidden="true"
          >
            <p className="hero-cyber-card-label">Cloud & Network</p>
            <svg
              viewBox="0 0 260 155"
              className="hero-cyber-svg hero-cyber-svg-cloud"
            >
              <path d="M58 104h132c20 0 35-14 35-30s-14-29-32-30c-7-17-22-28-41-28-22 0-40 15-44 36-19 1-33 14-33 31s15 31 33 31z" />
              <circle cx="66" cy="124" r="8" />
              <circle cx="130" cy="134" r="8" />
              <circle cx="194" cy="124" r="8" />
              <path d="M66 124h64M130 134h64M130 134V104" />
            </svg>
          </article>

          <article
            className="hero-cyber-card hero-cyber-card-graph"
            aria-hidden="true"
          >
            <p className="hero-cyber-card-label">AI Systems</p>
            <svg
              viewBox="0 0 280 170"
              className="hero-cyber-svg hero-cyber-svg-ai"
            >
              <path d="M72 124h142" />
              <path d="m72 124 22-40 24 16 26-52 30 30 40-22" />
              <circle cx="94" cy="84" r="6" />
              <circle cx="118" cy="100" r="6" />
              <circle cx="144" cy="48" r="6" />
              <circle cx="174" cy="78" r="6" />
              <circle cx="214" cy="56" r="6" />
              <path d="m68 46 20-12 20 12v24L88 82 68 70zm104 0 20-12 20 12v24l-20 12-20-12z" />
              <path d="M108 58h64" />
            </svg>
          </article>

          <div className="hero-cyber-center">
            <div className="hero-cyber-copy font-display" role="presentation">
              <div className="hero-cyber-ticker-board">
                <span className="hero-cyber-ticker-badge">EST</span>
                <div className="hero-cyber-ticker-line">
                  <div
                    key={activeLine}
                    className="hero-cyber-ticker-track"
                    style={{ "--ticker-duration": "10.5s" }}
                  >
                    <span className="hero-cyber-ticker-text">{activeLine}</span>
                    <span className="hero-cyber-ticker-text" aria-hidden="true">
                      {activeLine}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-white/90">
          Download my resume
        </p>
        <div className="hero-actions-clean mt-4 flex justify-center">
          <a
            href={resumeUrl}
            download
            className="hero-button-primary inline-flex items-center gap-2 rounded-2xl px-7 py-3 text-base font-semibold text-white shadow-lg"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
