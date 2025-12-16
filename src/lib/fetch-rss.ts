import type { Feed } from "@/types/feed";
import type { RssFeed } from "@/types/rss-feed";
import { toast } from "sonner";

/**
 * Fetches parsed RSS feed from the backend
 * Returns JSON containing feed metadata and items.
 */
export async function fetchRssFeed(feed: Partial<Feed>) {
  console.info("Cache miss, fetching feed");
  if (!feed.url) throw new Error("Feed URL is required");

  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  try {
    const fetchedFeed = await fetch(
      `${BASE_URL}/rss?id=${feed.id}&url=${encodeURIComponent(feed.url)}`,
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

    const json: RssFeed = await fetchedFeed.json();
    console.log(json);
    return json;
  } catch {
    toast.error("Failed to fetch RSS feed", {
      description: `Failed to fetch ${new URL(feed.url).hostname}. Are you connected to the internet?`,
    });
    return null;
  }
}
