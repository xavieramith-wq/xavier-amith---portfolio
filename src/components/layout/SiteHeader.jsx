import ThemeIcon from "./icons/ThemeIcon";
import ActionButton from "../ui/ActionButton";

export default function SiteHeader({
  navLinks,
  navScrolled,
  activeSection,
  navigateTo,
  theme,
  toggleTheme,
  mobileMenuOpen,
  setMobileMenuOpen,
  portfolioName,
}) {
  return (
    <header className={`site-header ${navScrolled ? "is-scrolled" : ""}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <ActionButton
          type="button"
          onClick={() => navigateTo("home")}
          className="brand-mark border-0 bg-transparent px-0 py-0 font-display text-lg font-semibold tracking-[0.08em] text-white"
        >
          {portfolioName}
        </ActionButton>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <ActionButton
              key={link.id}
              type="button"
              onClick={() => navigateTo(link.id)}
              className={`nav-link rounded-full border-0 bg-transparent px-4 py-2 text-sm transition ${
                activeSection === link.id
                  ? "is-current text-white"
                  : "text-slate-300"
              }`}
            >
              {link.label}
            </ActionButton>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ActionButton
            type="button"
            onClick={toggleTheme}
            className="icon-button h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <ThemeIcon theme={theme} />
          </ActionButton>

          <ActionButton
            type="button"
            className="icon-button h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 rounded-full bg-current transition ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 rounded-full bg-current transition ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 rounded-full bg-current transition ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </ActionButton>
        </div>
      </nav>

      {mobileMenuOpen ? (
        <div className="mobile-drawer border-t border-white/10 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <ActionButton
                key={link.id}
                type="button"
                onClick={() => navigateTo(link.id)}
                className={`nav-link rounded-2xl border border-white/10 px-4 py-3 text-left text-sm ${
                  activeSection === link.id
                    ? "is-current text-white"
                    : "bg-white/5 text-slate-300"
                }`}
              >
                {link.label}
              </ActionButton>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
