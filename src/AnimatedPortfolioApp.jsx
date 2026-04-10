import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "./animated.css";
import { navLinks } from "./config/navigation";
import { skillLevels } from "./config/skillLevels";
import useLivePortfolioContent from "./hooks/useLivePortfolioContent";
import { easeOutCubic } from "./utils/easeOutCubic";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import ActionButton from "./components/ui/ActionButton";
import AboutSection from "./sections/AboutSection";
import CertificationsSection from "./sections/CertificationsSection";
import ContactSection from "./sections/ContactSection";
import EducationSection from "./sections/EducationSection";
import HomeSection from "./sections/HomeSection";
import ProfilesSection from "./sections/ProfilesSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";

const toneBySection = {
  home: "cyan",
  about: "blue",
  skills: "gold",
  projects: "cyan",
  education: "violet",
  certifications: "purple",
  profiles: "cyan",
  contact: "magenta",
};

const contactEndpoint = "http://localhost:5000/contact";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm(formData) {
  const name = formData.name.trim();
  const email = formData.email.trim();
  const subject = formData.subject.trim();
  const message = formData.message.trim();

  if (!name || !email || !subject || !message) {
    return {
      isValid: false,
      message: "Please fill in all fields before sending your message.",
    };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Please enter a valid email address.",
    };
  }

  return { isValid: true, message: "" };
}

function AnimatedPortfolioApp() {
  const { content, syncState, lastSyncedAt } = useLivePortfolioContent();
  const { portfolio, skillGroups, projects, certifications, codingProfiles } =
    content;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [projectFilter, setProjectFilter] = useState("All");
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({
    type: "idle",
    message: "",
  });
  const [isPreloading, setIsPreloading] = useState(true);
  const [preloaderLeaving, setPreloaderLeaving] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [counterValues, setCounterValues] = useState([]);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [cursorState, setCursorState] = useState({
    x: 0,
    y: 0,
    interactive: false,
    pressed: false,
    hidden: true,
    text: false,
  });

  const sectionRefs = useRef({});
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const appRef = useRef(null);
  const profileImage = "/images/profile/Portfolio_Image.jpeg";
  const validSectionIds = useMemo(
    () => new Set(navLinks.map((link) => link.id)),
    [],
  );

  const roles = useMemo(() => {
    const list =
      Array.isArray(portfolio.roles) && portfolio.roles.length
        ? portfolio.roles
        : [portfolio.heroRole || "Developer"];

    return list;
  }, [portfolio.roles, portfolio.heroRole]);

  const counterSpecs = useMemo(
    () =>
      (portfolio.counters || []).map((counter) => {
        const numberPart = counter.value.match(/\d+/)?.[0] ?? "0";

        return {
          ...counter,
          target: Number(numberPart),
          width: numberPart.length,
          suffix: counter.value.replace(numberPart, ""),
        };
      }),
    [portfolio.counters],
  );

  const skillsWithLevels = useMemo(
    () =>
      (skillGroups || []).map((group) => ({
        ...group,
        skills: (group.skills || []).map((skill) => ({
          name: skill,
          level: skillLevels[skill] ?? 75,
        })),
      })),
    [skillGroups],
  );

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") {
      return projects || [];
    }

    return (projects || []).filter(
      (project) => project.category === projectFilter,
    );
  }, [projectFilter, projects]);

  const socials = useMemo(
    () => [
      { platform: "linkedin", href: portfolio.contact?.linkedin || "" },
      { platform: "github", href: portfolio.contact?.github || "" },
      { platform: "email", href: `mailto:${portfolio.contact?.email || ""}` },
    ],
    [portfolio.contact],
  );

  const contactItems = useMemo(
    () => [
      {
        label: "Email",
        value: portfolio.contact?.email || "",
        href: `mailto:${portfolio.contact?.email || ""}`,
        icon: "email",
      },
      {
        label: "Phone",
        value: portfolio.contact?.phone || "",
        href: `tel:${portfolio.contact?.phone || ""}`,
        icon: "phone",
      },
      {
        label: "Location",
        value: portfolio.contact?.location || "",
        href: null,
        icon: "location",
      },
    ],
    [portfolio.contact],
  );

  const sectionTone = toneBySection[activeSection] || "cyan";
  const syncLabel =
    syncState === "live"
      ? "Live Sync"
      : syncState === "syncing"
        ? "Syncing"
        : syncState === "error"
          ? "Local Cache"
          : "Local Mode";
  const syncedTime = lastSyncedAt
    ? lastSyncedAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 520,
      easing: "ease-out-cubic",
      offset: 70,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    setTheme(savedTheme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-light", theme === "light");
    document.body.classList.toggle("theme-dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("preloading", isPreloading);

    const leaveTimeout = window.setTimeout(
      () => setPreloaderLeaving(true),
      1700,
    );
    const hideTimeout = window.setTimeout(() => {
      setIsPreloading(false);
      AOS.refreshHard();
    }, 2350);

    return () => {
      window.clearTimeout(leaveTimeout);
      window.clearTimeout(hideTimeout);
      document.body.classList.remove("preloading");
    };
  }, [isPreloading]);

  useEffect(() => {
    if (!roles.length) {
      return undefined;
    }

    const role = roles[roleIndex % roles.length];
    const isComplete = typedText === role;
    const isCleared = typedText === "";
    const delay = isDeleting ? 45 : 95;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && !isComplete) {
          setTypedText(role.slice(0, typedText.length + 1));
          return;
        }

        if (!isDeleting && isComplete) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && !isCleared) {
          setTypedText(role.slice(0, typedText.length - 1));
          return;
        }

        setIsDeleting(false);
        setRoleIndex((currentIndex) => (currentIndex + 1) % roles.length);
      },
      isComplete && !isDeleting ? 1500 : delay,
    );

    return () => window.clearTimeout(timeout);
  }, [isDeleting, roleIndex, typedText, roles]);

  useEffect(() => {
    setRoleIndex(0);
    setTypedText("");
    setIsDeleting(false);
  }, [roles]);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 30);
      setShowBackToTop(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isPreloading) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      AOS.refreshHard();
    }, 60);

    return () => window.clearTimeout(timeout);
  }, [activeSection, isPreloading]);

  useEffect(() => {
    if (activeSection === "about") {
      setAboutVisible(true);
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "skills") {
      setSkillsVisible(true);
    }
  }, [activeSection]);

  useEffect(() => {
    if (!aboutVisible || !counterSpecs.length) {
      return undefined;
    }

    let animationFrame = 0;
    const startTime = performance.now();
    const duration = 1400;

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);

      setCounterValues(
        counterSpecs.map((spec) => Math.round(spec.target * eased)),
      );

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [aboutVisible, counterSpecs]);

  useEffect(() => {
    if (isPreloading) {
      return undefined;
    }

    const targetHash = window.location.hash.replace("#", "");
    if (targetHash && validSectionIds.has(targetHash) && targetHash !== "contact") {
      setActiveSection(targetHash);
    } else {
      setActiveSection("home");
    }
  }, [isPreloading, validSectionIds]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(pointer:fine)").matches
    ) {
      return undefined;
    }

    setCursorEnabled(true);

    const handleMove = (event) => {
      setCursorState((current) => ({
        ...current,
        x: event.clientX,
        y: event.clientY,
        hidden: false,
      }));
    };

    const handleDown = () => {
      setCursorState((current) => ({ ...current, pressed: true }));
    };

    const handleUp = () => {
      setCursorState((current) => ({ ...current, pressed: false }));
    };

    const handleOver = (event) => {
      const interactiveElement = event.target.closest(
        "a, button, input, textarea, .card-base, .project-card",
      );

      setCursorState((current) => ({
        ...current,
        interactive: Boolean(interactiveElement),
        text:
          interactiveElement?.matches("input, textarea") ||
          interactiveElement?.closest(".floating-field") !== null,
      }));
    };

    const handleLeaveWindow = () => {
      setCursorState((current) => ({ ...current, hidden: true }));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerleave", handleLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerleave", handleLeaveWindow);
    };
  }, []);

  useEffect(() => {
    if (isPreloading) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray(
        ".glass-edge, .profiles-showcase-card, .cert-showcase-card, .project-card",
      );

      nodes.forEach((node, index) => {
        gsap.fromTo(
          node,
          { opacity: 0.82, y: 22, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.62,
            ease: "power2.out",
            delay: Math.min(index * 0.012, 0.16),
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, appRef);

    return () => {
      ctx.revert();
    };
  }, [isPreloading, activeSection]);

  const navigateTo = (sectionId) => {
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    window.history.replaceState(
      null,
      "",
      sectionId === "home" ? window.location.pathname : `#${sectionId}`,
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (formStatus.type !== "idle") {
      setFormStatus({ type: "idle", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setFormStatus({
        type: "error",
        message: validation.message,
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: "idle", message: "" });

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      const result = await response.json().catch(() => ({}));
      if (result?.success !== true) {
        throw new Error("Form submission failed");
      }

      setFormStatus({
        type: "success",
        message: "Message sent successfully!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error.name === "AbortError"
            ? "Request timed out. Please try again."
            : "Failed to send message. Please try again.",
      });
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const setSectionRef = (sectionId) => (element) => {
    sectionRefs.current[sectionId] = element;
  };

  const formatCounterValue = (spec, value) =>
    `${String(value).padStart(spec.width, "0")}${spec.suffix}`;

  const renderActiveSection = () => {
    switch (activeSection) {
      case "about":
        return (
          <AboutSection
            portfolio={portfolio}
            profileImage={profileImage}
            counterSpecs={counterSpecs}
            counterValues={counterValues}
            formatCounterValue={formatCounterValue}
            setSectionRef={setSectionRef}
            aboutRef={aboutRef}
          />
        );
      case "skills":
        return (
          <SkillsSection
            skillsWithLevels={skillsWithLevels}
            skillsVisible={skillsVisible}
            setSectionRef={setSectionRef}
            skillsRef={skillsRef}
          />
        );
      case "projects":
        return (
          <ProjectsSection
            filteredProjects={filteredProjects}
            projectFilter={projectFilter}
            setProjectFilter={setProjectFilter}
            setSectionRef={setSectionRef}
          />
        );
      case "education":
        return (
          <EducationSection
            portfolio={portfolio}
            setSectionRef={setSectionRef}
          />
        );
      case "certifications":
        return (
          <CertificationsSection
            certifications={certifications}
            setSectionRef={setSectionRef}
          />
        );
      case "profiles":
        return (
          <ProfilesSection
            codingProfiles={codingProfiles}
            setSectionRef={setSectionRef}
          />
        );
      case "contact":
        return (
          <ContactSection
            contactItems={contactItems}
            socials={socials}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            formStatus={formStatus}
            setSectionRef={setSectionRef}
          />
        );
      case "home":
      default:
        return (
          <HomeSection
            portfolio={portfolio}
            typedText={typedText}
            navigateTo={navigateTo}
            setSectionRef={setSectionRef}
          />
        );
    }
  };

  return (
    <div
      ref={appRef}
      data-tone={sectionTone}
      className={`theme-shell premium-dark-ui flex min-h-screen flex-col bg-ink font-body text-slate-100 ${cursorEnabled ? "cursor-hidden" : ""}`}
    >
      {isPreloading ? (
        <div className={`preloader ${preloaderLeaving ? "is-leaving" : ""}`}>
          <div className="preloader-inner">
            <div className="preloader-name" aria-label={portfolio.name}>
              {String(portfolio.name || "Portfolio")
                .split("")
                .map((character, index) => (
                  <span
                    key={`${character}-${index}`}
                    className="preloader-letter"
                    style={{ "--char-index": index }}
                  >
                    {character === " " ? "\u00A0" : character}
                  </span>
                ))}
            </div>
            <p className="preloader-subtitle">Loading portfolio experience</p>
          </div>
        </div>
      ) : null}

      {cursorEnabled ? (
        <div
          className={`cursor-dot ${cursorState.interactive ? "is-active" : ""} ${cursorState.pressed ? "is-pressed" : ""} ${cursorState.hidden ? "is-hidden" : ""} ${cursorState.text ? "is-text" : ""}`}
          style={{
            transform: `translate(${cursorState.x}px, ${cursorState.y}px)`,
          }}
        />
      ) : null}

      <div className="sync-pill" aria-live="polite">
        <span className={`sync-dot sync-${syncState}`} />
        <span>{syncLabel}</span>
        {syncedTime ? <span className="sync-time">{syncedTime}</span> : null}
      </div>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="page-mesh absolute inset-0" />
        <div className="page-aura absolute inset-0" />
        <div className="page-grid absolute inset-0 bg-grid-fade bg-[size:56px_56px] opacity-20" />
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className={`particle particle-${(index % 4) + 1}`}
            style={{ "--particle-index": index }}
          />
        ))}
      </div>

      <SiteHeader
        navLinks={navLinks}
        navScrolled={navScrolled}
        activeSection={activeSection}
        navigateTo={navigateTo}
        theme={theme}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        portfolioName={portfolio.name}
      />

      <main className="relative z-10 flex-1">{renderActiveSection()}</main>

      <SiteFooter
        portfolio={portfolio}
        socials={socials}
        navLinks={navLinks}
        navigateTo={navigateTo}
      />

      <ActionButton
        type="button"
        onClick={() => navigateTo("home")}
        className={`back-to-top ${showBackToTop ? "is-visible" : ""}`}
        aria-label="Back to top"
      >
        Top
      </ActionButton>
    </div>
  );
}

export default AnimatedPortfolioApp;
