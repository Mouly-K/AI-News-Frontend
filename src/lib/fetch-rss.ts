import type { RssFeed } from "@/types/rss-feed";
import { toast } from "sonner";

/**
 * Fetches parsed RSS feed from the backend
 * Returns JSON containing feed metadata and items.
 */
export async function fetchRssFeed(feedUrl: string) {
  console.info("Cache miss, fetching feed");
  if (!feedUrl) throw new Error("Feed URL is required");

  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  try {
    const feed = await fetch(
      `${BASE_URL}/rss?url=${encodeURIComponent(feedUrl)}`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Application-Type": "application/json",
          "Access-Control-Allow-Origin": BASE_URL,
        },
      },
    );

    const json: RssFeed = await feed.json();
    console.log(json);
    return json;
  } catch {
    toast.error("Failed to fetch RSS feed", {
      description: `Failed to fetch ${new URL(feedUrl).hostname}. Are you connected to the internet?`,
    });
    return null;
  }
}
