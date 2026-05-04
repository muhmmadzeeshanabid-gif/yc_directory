import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/lib/client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Live content is currently only available on the experimental API
    apiVersion: "vX", // Assuming vX for live API, or let it use default from client
  }),
});
