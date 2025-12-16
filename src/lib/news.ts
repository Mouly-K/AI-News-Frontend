import type { UseQueryResult } from "@tanstack/react-query";
import type { Category } from "@/types/category";
import type { RssFeed, RssItem } from "@/types/rss-feed";

const _cnt = (a: string, b: string) =>
  a.toLowerCase().includes(b.toLowerCase());

function filterRssItems(
  data: RssFeed,
  searchQuery: string,
  selectedCategories: Category[] = [],
): RssItem[] {
  const query = searchQuery.trim().toLowerCase();
  const hasSelectedCategories = selectedCategories.length > 0;

  return data?.items?.filter((item) => {
    // Apply search query filter
    const matchesQuery =
      !query.length ||
      _cnt(item.title, query) ||
      _cnt(item.description, query) ||
      _cnt(item.link, query) ||
      item.categories?.some((category) => _cnt(category, query)) ||
      _cnt(data.title, query) ||
      _cnt(data.description, query) ||
      _cnt(data.link, query) ||
      data.categories?.some((category) => _cnt(category.name, query));

    // Apply category filter
    if (!hasSelectedCategories) {
      // If no categories selected, include all items
      return matchesQuery;
    }

    // Check if both item and data categories are empty (general items)
    const itemHasCategories = item.categories && item.categories.length > 0;
    const dataHasCategories = data.categories && data.categories.length > 0;

    if (!itemHasCategories && !dataHasCategories) {
      // General items are included regardless of category filter
      return matchesQuery;
    }

    // Check if item or data categories match selected categories
    const matchesCategory =
      (itemHasCategories &&
        item.categories!.some((category) =>
          selectedCategories.some((selectedCategory) =>
            _cnt(category, selectedCategory.name),
          ),
        )) ||
      (dataHasCategories &&
        data.categories!.some((category) =>
          selectedCategories.some((selectedCategory) =>
            _cnt(category.name, selectedCategory.name),
          ),
        ));

    return matchesQuery && matchesCategory;
  });
}

interface InterleavedItem {
  item: RssItem | null;
  feedData: RssFeed | null;
  feedIdx: number;
  itemIdx: number;
  isLoading: boolean;
}

// Interleave items from all feeds in round-robin fashion
function interleaveItems(
  feedQueries: UseQueryResult<RssFeed | null, Error>[],
  searchQuery: string,
  selectedCategories: Category[],
): InterleavedItem[] {
  // Create array of filtered items for each feed with metadata
  const feedItems = feedQueries.map(({ isLoading, isError, data }, feedIdx) => {
    if (isLoading || isError || !data) return [];
    return filterRssItems(data, searchQuery, selectedCategories).map(
      (item, itemIdx) => ({
        item,
        feedData: data,
        feedIdx,
        itemIdx,
        isLoading: false,
      }),
    );
  });

  // Check if any feeds are loading
  const isAnyLoading = feedQueries.some(({ isLoading }) => isLoading);

  // If any feeds are loading, add skeleton loaders
  if (isAnyLoading) {
    const result = [];
    const totalFeeds = feedQueries.length;
    const totalSkeletons = totalFeeds * 4; // Show 4 skeleton rows per feed

    for (let i = 0; i < totalSkeletons; i++) {
      for (let j = 0; j < feedItems.length; j++) {
        if (i < feedItems[j].length) {
          result.push(feedItems[j][i]);
        } else if (feedQueries[j].isLoading) {
          result.push({
            item: null,
            feedData: null,
            feedIdx: j,
            itemIdx: i,
            isLoading: true,
          });
        }
      }
    }
    return result;
  }

  // Interleave items round-robin style
  const result = [];
  let maxLength = Math.max(...feedItems.map((items) => items.length), 0);

  for (let i = 0; i < maxLength; i++) {
    for (let j = 0; j < feedItems.length; j++) {
      if (i < feedItems[j].length) {
        result.push(feedItems[j][i]);
      }
    }
  }

  return result;
}

export { filterRssItems, interleaveItems };
