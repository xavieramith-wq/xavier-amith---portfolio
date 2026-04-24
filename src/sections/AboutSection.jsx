import SectionHeading from "../components/ui/SectionHeading";

export default function AboutSection({
  portfolio,
  profileImage,
  counterSpecs,
  counterValues,
  formatCounterValue,
  setSectionRef,
  aboutRef,
}) {
  const aboutStars = Array.from({ length: 22 });

  return (
    <section
      id="about"
      ref={(element) => {
        setSectionRef("about")(element);
        aboutRef.current = element;
      }}
      className="section-shell about-cosmos-section scroll-mt-24"
      data-section
    >
      <div className="about-cosmos-backdrop" aria-hidden="true">
        <div className="about-cosmos-stars">
          {aboutStars.map((_, index) => (
            <span
              key={index}
              className="about-cosmos-star"
              style={{ "--about-star": index }}
            />
          ))}
        </div>

        <span className="about-cosmos-cloud about-cosmos-cloud-one" />
        <span className="about-cosmos-cloud about-cosmos-cloud-two" />

        <div className="about-cosmos-network">
          <span className="about-network-line about-network-line-one" />
          <span className="about-network-line about-network-line-two" />
          <span className="about-network-line about-network-line-three" />
          <span className="about-network-node about-network-node-one" />
          <span className="about-network-node about-network-node-two" />
          <span className="about-network-node about-network-node-three" />
          <span className="about-network-node about-network-node-four" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="A student portfolio built to showcase my passion for Cloud, Networks, Security, and AI."
          description="A quick snapshot of who I am, what I study, and my interests in cloud computing, networking, cybersecurity, and AI—along with my growing skills in software development, testing, and prompt engineering through hands-on projects."
          center
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div data-aos="fade-right">
            <div className="about-photo-shell card-base glass-surface glass-edge rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <div className="about-photo-glow" />
              <img
                src={profileImage}
                alt="Portrait of Xavier Amith"
                className="relative z-10 h-auto w-full rounded-[1.5rem] border border-white/10 object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "/images/profile/profile-placeholder.svg";
                }}
              />
            </div>
          </div>

          <div
            className="card-base glass-surface glass-edge rounded-[2rem] border border-white/10 bg-panel/70 p-6 sm:p-8"
            data-aos="fade-left"
          >
            <div className="space-y-5 text-base leading-8 text-slate-300">
              {portfolio.bio.map((line, index) => (
                <p key={line} data-aos="fade-up" data-aos-delay={index * 70}>
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {counterSpecs.map((counter, index) => (
                <div
                  key={counter.label}
                  className="stat-card card-base glass-surface glass-edge rounded-3xl border border-white/10 bg-white/5 p-5"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <p className="font-display text-3xl font-semibold text-white">
                    {formatCounterValue(counter, counterValues[index] ?? 0)}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{counter.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
