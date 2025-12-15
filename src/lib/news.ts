import type { RssFeed, RssItem } from "@/types/rss-feed";

function filterRssItems(data: RssFeed, searchQuery: string): RssItem[] {
  const query = searchQuery.trim().toLowerCase();

  if (!query.length) return data.items;

  return data?.items?.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.link.toLowerCase().includes(query) ||
      item.categories.some((category) =>
        category.toLowerCase().includes(query),
      ) ||
      data.title.toLowerCase().includes(query) ||
      data.description.toLowerCase().includes(query) ||
      data.link.toLowerCase().includes(query) ||
      data.categories?.some((category) =>
        category.toLowerCase().includes(query),
      ),
  );
}

export { filterRssItems };
