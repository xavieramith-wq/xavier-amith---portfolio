import ActionButton from "../components/ui/ActionButton";
import SectionHeading from "../components/ui/SectionHeading";

export default function ProjectsSection({
  filteredProjects,
  projectFilter,
  setProjectFilter,
  setSectionRef,
}) {
  return (
    <section
      id="projects"
      ref={setSectionRef("projects")}
      className="section-shell scroll-mt-24"
      data-section
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="My Work"
          title="Featured projects with richer hover interactions."
          description="Projects built with real-world technologies, showcased through a modern and interactive interface."
          center
        />

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          data-aos="fade-up"
        >
          {["All", "Web", "Mobile", "Design"].map((filter) => (
            <ActionButton
              key={filter}
              type="button"
              onClick={() => setProjectFilter(filter)}
              className={`filter-pill rounded-full border px-7 py-3 text-base font-medium ${
                projectFilter === filter
                  ? "is-active border-transparent text-slate-950"
                  : "border-white/10 bg-white/5 text-slate-200"
              }`}
            >
              {filter}
            </ActionButton>
          ))}
        </div>

        <div className="mt-16 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.title}
              className="project-card card-base group overflow-hidden rounded-[2rem] border border-white/10 bg-[#1a1f27]"
              data-aos="fade-up"
              data-aos-delay={index * 90}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "/images/certificates/certificate-placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101826] via-transparent to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-panel/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                  {project.category}
                </div>
                <div className="project-overlay">
                  <div className="flex items-center gap-3">
                    <ActionButton
                      as="a"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-overlay-link rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white"
                    >
                      GitHub
                    </ActionButton>
                    <ActionButton
                      as="a"
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="project-overlay-link project-overlay-link--primary rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      Live Demo
                    </ActionButton>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-3xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>

                <p className="mt-5 flex-1 text-base leading-8 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-xl border border-violet-500/35 bg-violet-500/10 px-4 py-2 text-sm text-violet-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
