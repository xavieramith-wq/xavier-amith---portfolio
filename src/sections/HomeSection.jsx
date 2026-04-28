import ActionButton from "../components/ui/ActionButton";

export default function HomeSection({
  portfolio,
  typedText,
  navigateTo,
  setSectionRef,
}) {
  const resumeUrl = "/images/Xavier_Amith_Resume.pdf";

  return (
    <section
      id="home"
      ref={setSectionRef("home")}
      className="hero-section hero-cyber-section scroll-mt-24"
      data-section
    >
      <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="hero-cyber-stage sharp-edges">
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
            className="hero-cyber-card hero-cyber-card-monitor sharp-edges"
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
            className="hero-cyber-card hero-cyber-card-laptop sharp-edges"
            aria-hidden="true"
          >
            <p className="hero-cyber-card-label">Coding & Debugging</p>
            <svg
              viewBox="0 0 280 170"
              className="hero-cyber-svg hero-cyber-svg-code"
            >
              <rect x="16" y="22" width="248" height="112" rx="0" />
              <path d="m76 66-22 18 22 18M114 66l22 18-22 18M168 90h44" />
              <path d="m178 50 7-6 9 2 4 8-4 8-9 2-7-6-7 6-9-2-4-8 4-8 9-2z" />
              <circle cx="182" cy="54" r="4" />
              <path d="M52 146h176" />
            </svg>
          </article>

          <article
            className="hero-cyber-card hero-cyber-card-cloud sharp-edges"
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
            className="hero-cyber-card hero-cyber-card-graph sharp-edges"
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
            <div className="hero-cyber-copy font-display">
              <p className="section-eyebrow mb-4 text-center text-[0.7rem] text-white/70">
                Portfolio 2026
              </p>
              <h1 className="mx-auto max-w-4xl text-balance text-center font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Xavier Amith
              </h1>
              <p className="typing-caret mt-4 text-center text-lg font-medium text-slate-200 sm:text-xl">
                {typedText || portfolio.heroRole}
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {portfolio.heroTagline}
              </p>
              <div className="mt-6 flex justify-center">
                <span className="hero-badge text-sm font-semibold text-white/90 sm:text-base">
                  EST. 2026 | MCA Student Portfolio
                </span>
              </div>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <ActionButton
                  type="button"
                  onClick={() => navigateTo("projects")}
                  className="hero-button-primary inline-flex items-center justify-center rounded-none px-6 py-3 text-base font-semibold text-white"
                >
                  Explore Projects
                </ActionButton>
                <ActionButton
                  type="button"
                  onClick={() => navigateTo("contact")}
                  className="hero-button-secondary inline-flex items-center justify-center rounded-none px-6 py-3 text-base font-semibold text-white"
                >
                  Get In Touch
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div
          className="card-base glass-surface glass-edge sharp-edges rounded-none border border-white/10 bg-white/5 p-6 text-left sm:p-8"
          data-aos="fade-up"
        >
          <p className="section-eyebrow">Resume</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Download the latest version of my resume.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            A concise snapshot of my technical skills, projects, certifications,
            and academic background.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={resumeUrl}
              download
              className="hero-button-primary inline-flex items-center justify-center rounded-none px-7 py-3 text-base font-semibold text-white shadow-lg"
            >
              Download Resume
            </a>
            <ActionButton
              type="button"
              onClick={() => navigateTo("about")}
              className="hero-button-secondary inline-flex items-center justify-center rounded-none px-7 py-3 text-base font-semibold text-white"
            >
              Learn More
            </ActionButton>
          </div>
        </div>

        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          {[
            {
              title: "Core strengths",
              value: "Cloud, AI, networking, software testing",
            },
            {
              title: "Current focus",
              value: "Hands-on project building and internship readiness",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="card-base glass-surface glass-edge sharp-edges rounded-none border border-white/10 bg-white/5 p-5"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                {item.title}
              </p>
              <p className="mt-3 text-lg leading-8 text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
