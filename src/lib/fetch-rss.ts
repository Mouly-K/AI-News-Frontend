import type { RssFeed } from "@/types/rss-feed";

/**
 * Fetches parsed RSS feed from the backend
 * Returns JSON containing feed metadata and items.
 */
export async function fetchRssFeed(feedUrl: string) {
  console.info("Cache miss, fetching feed");
  if (!feedUrl) throw new Error("Feed URL is required");

  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const feed = await fetch(
    `${BASE_URL}rss?url=${encodeURIComponent(feedUrl)}`,
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
}
