export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-21'

export const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();
export const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mf5hh3ap").trim();
export const useCdn = false
