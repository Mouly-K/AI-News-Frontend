import { useQueries } from "@tanstack/react-query";
import { fetchRssFeed } from "@/lib/fetch-rss";

export function useRssFeeds(feedUrls: string[]) {
  return useQueries({
    queries: feedUrls.map((url) => ({
      queryKey: ["rssFeed", url],
      queryFn: () => fetchRssFeed(url),
      enabled: !!url,
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      retry: 2,
    })),
  });
}
