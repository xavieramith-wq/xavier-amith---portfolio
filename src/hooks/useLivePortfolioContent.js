import { useEffect, useMemo, useState } from "react";
import {
  certifications as localCertifications,
  codingProfiles as localCodingProfiles,
  portfolio as localPortfolio,
  projects as localProjects,
  skillGroups as localSkillGroups,
} from "../data/portfolio";
import { sanityClient, sanityEnabled } from "../lib/sanityClient";

const LIVE_QUERY = `*[_type == "portfolioContent"][0]{
  portfolio,
  skillGroups,
  projects,
  certifications,
  codingProfiles,
  _updatedAt
}`;

const fallbackContent = {
  portfolio: localPortfolio,
  skillGroups: localSkillGroups,
  projects: localProjects,
  certifications: localCertifications,
  codingProfiles: localCodingProfiles,
  _updatedAt: null,
};

const coerceArray = (value, fallback) =>
  Array.isArray(value) && value.length ? value : fallback;

const normalizeContent = (raw) => {
  if (!raw || typeof raw !== "object") {
    return fallbackContent;
  }

  return {
    portfolio:
      raw.portfolio && typeof raw.portfolio === "object"
        ? {
            ...localPortfolio,
            ...raw.portfolio,
            about: { ...localPortfolio.about, ...(raw.portfolio.about || {}) },
            contact: {
              ...localPortfolio.contact,
              ...(raw.portfolio.contact || {}),
            },
            counters: coerceArray(raw.portfolio.counters, localPortfolio.counters),
            roles: coerceArray(raw.portfolio.roles, localPortfolio.roles),
            bio: coerceArray(raw.portfolio.bio, localPortfolio.bio),
            educationList: coerceArray(
              raw.portfolio.educationList,
              localPortfolio.educationList,
            ),
          }
        : localPortfolio,
    skillGroups: coerceArray(raw.skillGroups, localSkillGroups),
    projects: coerceArray(raw.projects, localProjects),
    certifications: coerceArray(raw.certifications, localCertifications).map(
      (item) => ({
        ...item,
        icon: item.icon || "monitor",
      }),
    ),
    codingProfiles: coerceArray(raw.codingProfiles, localCodingProfiles),
    _updatedAt: raw._updatedAt || null,
  };
};

export default function useLivePortfolioContent() {
  const [content, setContent] = useState(fallbackContent);
  const [syncState, setSyncState] = useState(sanityEnabled ? "syncing" : "local");
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  useEffect(() => {
    if (!sanityEnabled || !sanityClient) {
      return undefined;
    }

    let isDisposed = false;

    const refreshContent = async () => {
      try {
        const snapshot = await sanityClient.fetch(LIVE_QUERY);
        if (isDisposed) {
          return;
        }

        setContent(normalizeContent(snapshot));
        setSyncState("live");
        setLastSyncedAt(new Date());
      } catch {
        if (!isDisposed) {
          setSyncState("error");
        }
      }
    };

    refreshContent();

    const pollMs = Number(import.meta.env.VITE_CONTENT_POLL_MS || 20000);
    const pollTimer = window.setInterval(refreshContent, pollMs);

    const visibilityRefresh = () => {
      if (document.visibilityState === "visible") {
        refreshContent();
      }
    };

    window.addEventListener("focus", refreshContent);
    document.addEventListener("visibilitychange", visibilityRefresh);

    const liveSubscription = sanityClient
      .listen(LIVE_QUERY, {}, { visibility: "query" })
      .subscribe({
        next: () => {
          refreshContent();
        },
        error: () => {
          if (!isDisposed) {
            setSyncState("error");
          }
        },
      });

    return () => {
      isDisposed = true;
      window.clearInterval(pollTimer);
      window.removeEventListener("focus", refreshContent);
      document.removeEventListener("visibilitychange", visibilityRefresh);
      liveSubscription.unsubscribe();
    };
  }, []);

  return useMemo(
    () => ({
      content,
      syncState,
      lastSyncedAt,
    }),
    [content, syncState, lastSyncedAt],
  );
}
