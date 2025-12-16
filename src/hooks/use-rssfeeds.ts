import { useQueries } from "@tanstack/react-query";
import { fetchRssFeed } from "@/lib/fetch-rss";
import type { Feed } from "@/types/feed";

export function useRssFeeds(feedUrls: Partial<Feed>[]) {
  return useQueries({
    queries: feedUrls.map((feed) => ({
      queryKey: ["rssFeed", feed.url],
      queryFn: () => fetchRssFeed(feed),
      enabled: !!feed.url,
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      retry: 2,
    })),
  });
}
