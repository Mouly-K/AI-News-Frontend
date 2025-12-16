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

export { filterRssItems };
