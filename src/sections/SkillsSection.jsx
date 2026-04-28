import IconTile from "../components/ui/IconTile";
import SectionHeading from "../components/ui/SectionHeading";

export default function SkillsSection({
  skillsWithLevels,
  skillsVisible,
  setSectionRef,
  skillsRef,
}) {
  return (
    <section
      id="skills"
      ref={(element) => {
        setSectionRef("skills")(element);
        skillsRef.current = element;
      }}
      className="section-shell scroll-mt-24"
      data-section
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Building Skills in Cloud, AI & Software"
          description="Each skill meter starts empty and smoothly fills when the section comes into view, creating an engaging and dynamic experience while highlighting my core strengths."
          center
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {skillsWithLevels.map((group, groupIndex) => (
            <div
              key={group.title}
              className="card-base glass-surface glass-edge sharp-edges rounded-none border border-white/10 bg-white/5 p-6"
              data-aos="fade-up"
              data-aos-delay={groupIndex * 90}
            >
              <div className="flex items-center gap-3">
                <IconTile label={group.title} accent />
                <h3 className="font-display text-xl font-semibold text-white">
                  {group.title}
                </h3>
              </div>

              <div className="mt-8 space-y-5">
                {group.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-slate-100">
                        {skill.name}
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-track sharp-edges">
                      <div
                        className="skill-fill"
                        style={{
                          width: skillsVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${skillIndex * 80}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
