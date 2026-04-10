import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2025-01-01";
const useCdn = import.meta.env.VITE_SANITY_USE_CDN === "true";
const token = import.meta.env.VITE_SANITY_READ_TOKEN;

export const sanityEnabled = Boolean(projectId && dataset);

export const sanityClient = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token,
      perspective: "published",
    })
  : null;

