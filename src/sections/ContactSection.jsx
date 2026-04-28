import { useEffect, useState } from "react";
import ContactIcon from "../components/layout/icons/ContactIcon";
import SocialIcon from "../components/layout/icons/SocialIcon";
import ActionButton from "../components/ui/ActionButton";
import FloatingField from "../components/ui/FloatingField";
import SectionHeading from "../components/ui/SectionHeading";

export default function ContactSection({
  contactItems,
  socials,
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  formStatus,
  setSectionRef,
}) {
  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });
  const resumeUrl = "/images/Xavier_Amith_Resume.pdf";

  useEffect(() => {
    if (formStatus.type === "idle") {
      return undefined;
    }

    setToast({
      visible: true,
      type: formStatus.type,
      message: formStatus.message,
    });

    const timeout = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }));
    }, 4200);

    return () => window.clearTimeout(timeout);
  }, [formStatus.type, formStatus.message]);

  return (
    <section
      id="contact"
      ref={setSectionRef("contact")}
      className="section-shell scroll-mt-24"
      data-section
    >
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's connect and build something strong."
          description="The contact section now feels more deliberate with animated cards, floating labels, softer form lighting, and polished social hover states."
          center
        />

        <div className="contact-stage mt-16 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            {contactItems.map((item, index) => (
              <div
                key={item.label}
                className="contact-card card-base rounded-[1.6rem] border border-white/10 bg-white/5 p-5 sm:p-6"
                data-aos="fade-up"
                data-aos-delay={index * 90}
              >
                <div className="flex items-center gap-5">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/35 bg-violet-500/10 text-violet-300">
                    <ContactIcon type={item.icon} />
                  </span>
                  <div>
                    <p className="text-sm text-slate-400">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        data-cursor="interactive"
                        className="mt-1 block text-xl font-medium text-white transition hover:text-violet-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-xl font-medium text-white">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div
              className="contact-card card-base rounded-[1.6rem] border border-white/10 bg-white/5 p-7"
              data-aos="fade-up"
              data-aos-delay="210"
            >
              <h3 className="text-3xl font-semibold text-white">Follow Me</h3>
              <div className="mt-6 flex flex-wrap gap-4">
                {socials.map((item) => (
                  <ActionButton
                    key={item.platform}
                    as="a"
                    href={item.href}
                    target={item.platform === "email" ? undefined : "_blank"}
                    rel={item.platform === "email" ? undefined : "noreferrer"}
                    className="social-orb inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300"
                  >
                    <SocialIcon platform={item.platform} />
                  </ActionButton>
                ))}
              </div>
            </div>
          </div>

          <div
            className="contact-form-shell card-base rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8"
            data-aos="fade-up"
            data-aos-delay="90"
          >
            <div className="contact-spotlight" />
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <FloatingField
                  id="name"
                  name="name"
                  type="text"
                  label="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FloatingField
                  id="email"
                  name="email"
                  type="email"
                  label="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <FloatingField
                id="subject"
                name="subject"
                type="text"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <FloatingField
                as="textarea"
                id="message"
                name="message"
                label="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="8"
                required
              />

              <ActionButton
                type="submit"
                disabled={isSubmitting}
                className={`cta-primary inline-flex w-full items-center justify-center rounded-2xl px-7 py-4 text-base font-semibold text-slate-950 ${
                  isSubmitting ? "cursor-not-allowed opacity-80" : ""
                }`}
              >
                <span className="mr-3 text-lg">&#9993;</span>
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </ActionButton>
            </form>
          </div>
        </div>

        <div
          className="mt-12 max-w-md rounded-[1.8rem] border border-violet-500/40 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(88,28,135,0.18),rgba(31,41,55,0.38))] p-7"
          data-aos="fade-up"
        >
          <h3 className="text-3xl font-semibold text-white">
            Looking for opportunities?
          </h3>
          <p className="mt-4 text-base leading-8 text-slate-300">
            I&apos;m currently seeking internship and full-time opportunities in
            software development.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ActionButton
              as="a"
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="cta-secondary inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold text-white"
            >
              View My Resume
            </ActionButton>
          </div>
        </div>
      </div>

      {toast.visible ? (
        <div
          className={`pointer-events-auto fixed bottom-6 left-1/2 z-[220] -translate-x-1/2 rounded-2xl border px-6 py-4 text-base font-semibold text-white shadow-xl backdrop-blur ${
            toast.type === "success"
              ? "border-emerald-300/60 bg-emerald-500/95 shadow-[0_18px_40px_rgba(16,185,129,0.45)]"
              : "border-rose-300/60 bg-rose-500/95 shadow-[0_18px_40px_rgba(244,63,94,0.45)]"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.message || "Message failed to send. Please try again."}
        </div>
      ) : null}
    </section>
  );
}
