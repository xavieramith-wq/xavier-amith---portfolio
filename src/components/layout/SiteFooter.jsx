import SocialIcon from "./icons/SocialIcon";
import ActionButton from "../ui/ActionButton";

export default function SiteFooter({
  portfolio,
  socials,
  navLinks,
  navigateTo,
}) {
  return (
    <footer className="site-footer border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div data-aos="fade-up">
            <p className="font-display text-4xl font-semibold text-violet-400">
              {portfolio.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </p>
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
              Computer Science Student | Aspiring Developer | Problem Solver
            </p>
            <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
              Building the future, one line of code at a time.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="90">
            <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
            <div className="mt-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <ActionButton
                  key={link.id}
                  type="button"
                  onClick={() => navigateTo(link.id)}
                  className="w-fit border-0 bg-transparent px-0 py-0 text-left text-base text-slate-300"
                >
                  {link.label}
                </ActionButton>
              ))}
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="180">
            <h3 className="text-2xl font-semibold text-white">
              Connect With Me
            </h3>
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
            <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
              Feel free to reach out for collaborations or just a friendly chat.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-200">
            @2026 Xavier Amith. Made with care and lots of code.
          </p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>|</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
