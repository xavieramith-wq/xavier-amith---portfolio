import ProfileIcon from "../components/layout/icons/ProfileIcon";
import ActionButton from "../components/ui/ActionButton";

export default function ProfilesSection({ codingProfiles, setSectionRef }) {
  return (
    <section
      id="profiles"
      ref={setSectionRef("profiles")}
      className="section-shell profiles-showcase-section scroll-mt-24"
      data-section
    >
      <div className="profiles-showcase-backdrop" aria-hidden="true">
        <span className="profiles-showcase-aura profiles-showcase-aura-left" />
        <span className="profiles-showcase-aura profiles-showcase-aura-right" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <header
          className="profiles-showcase-header mx-auto max-w-4xl text-center"
          data-aos="fade-up"
        >
          <p className="profiles-showcase-eyebrow">CODING PROFILES</p>
          <h2 className="profiles-showcase-title font-display">
            Practice platforms and public work.
          </h2>
          <p className="profiles-showcase-description">
            Interactive elements are refined with smooth transitions and
            intuitive visual feedback for a better user experience.
          </p>
        </header>

        <div className="profiles-showcase-arrow-wrap" aria-hidden="true">
          <svg viewBox="0 0 320 82" className="profiles-showcase-arrow">
            <path d="M16 66c54-33 126-33 183-6" />
            <path d="m190 37 92 13-62 30" />
          </svg>
        </div>

        <div className="profiles-showcase-grid mt-10 grid items-stretch gap-6 lg:grid-cols-3">
          {codingProfiles.map((profile, index) => (
            <ActionButton
              key={profile.platform}
              as="a"
              href={profile.link}
              target="_blank"
              rel="noreferrer"
              className={`profile-card profiles-showcase-card profiles-showcase-card-${(index % 3) + 1} flex h-full flex-col text-left`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="profiles-showcase-card-head flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="profiles-showcase-icon inline-flex h-14 w-14 items-center justify-center rounded-2xl">
                    <ProfileIcon platform={profile.platform} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="profiles-showcase-card-title font-display">
                      {profile.platform}
                    </h3>
                    <p className="profiles-showcase-handle mt-1 text-sm">
                      {profile.handle}
                    </p>
                  </div>
                </div>
                <span
                  className="profiles-showcase-link-arrow"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </div>
              <p className="profiles-showcase-stats mt-8 text-base leading-8">
                {profile.stats}
              </p>
            </ActionButton>
          ))}
        </div>
      </div>
    </section>
  );
}
