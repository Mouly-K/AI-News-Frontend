import { SidebarFilter } from "@/components/filters/sidebar-filter";

import { useSelectedFeeds } from "@/providers/selected-feeds";
import { useSelectedCategories } from "@/providers/selected-categories";
import { useFeeds } from "@/hooks/use-feeds";
import { useCategories } from "@/hooks/use-categories";

export function NavMain() {
  const { selectedFeeds, setSelectedFeeds } = useSelectedFeeds();
  const { selectedCategories, setSelectedCategories } = useSelectedCategories();

  const {
    data: feeds = [],
    isLoading: feedsLoading,
    isError: feedsError,
  } = useFeeds();

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  return (
    <>
      <SidebarFilter
        defaultOpen
        title="Sources"
        items={feeds}
        selectedItems={selectedFeeds}
        setSelectedItems={setSelectedFeeds}
      />
      <SidebarFilter
        title="Categories"
        items={categories}
        selectedItems={selectedCategories}
        setSelectedItems={setSelectedCategories}
      />
    </>
  );
}
