export default function EducationSection({ portfolio, setSectionRef }) {
  return (
    <section
      id="education"
      ref={setSectionRef("education")}
      className="section-shell scroll-mt-24"
      data-section
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="section-heading mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Education</p>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Academic milestones presented in the original clean layout.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            Your MCA and BCA details are shown in the previous static style.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {portfolio.educationList.map((education, index) => (
            <div
              key={`${education.degree}-${education.year}`}
              className="card-base glass-surface glass-edge education-light-trap overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <div className="education-head bg-[linear-gradient(90deg,rgba(34,211,238,0.14),rgba(99,102,241,0.16),rgba(217,70,239,0.12))] p-8 sm:p-10">
                <h3 className="max-w-3xl font-display text-3xl font-semibold text-white sm:text-4xl">
                  {education.degree}
                </h3>
                <p className="mt-4 text-lg text-slate-300">{education.college}</p>
              </div>

              <div className="education-grid-no-lines grid gap-5 p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-3">
                {[
                  { label: "Institution", value: education.college },
                  { label: "Program", value: education.program },
                  { label: "Duration", value: education.year },
                  { label: "CGPA", value: education.cgpa },
                  { label: "Current Year", value: education.currentYear },
                  { label: "Status", value: education.status },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="education-data-cell rounded-[1.5rem] bg-panel/70 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-3 text-lg font-medium text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="education-foot px-8 py-6 sm:px-10">
                <p className="max-w-4xl text-base leading-8 text-slate-400">
                  {education.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
