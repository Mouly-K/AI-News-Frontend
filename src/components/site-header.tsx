import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchInput from "@/components/ui/search-input";
import { CategoryFilter } from "@/components/category-filter";

import { useSearch } from "@/providers/search";
import { useCategories } from "@/providers/categories";

import categoriesData from "@/data/categories.json";

export function SiteHeader() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { selectedCategories, setSelectedCategories } = useCategories();

  return (
    <header className="flex h-(--header-height) rounded-t-xl bg-background sticky top-0 z-50 w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Articles</h1>
        <div className="ml-auto flex items-center gap-2">
          <SearchInput
            placeholderKey="articles"
            value={searchQuery}
            onChange={setSearchQuery}
            debounce={250}
            className="h-8"
          />
          <CategoryFilter
            title="Category"
            categories={categoriesData.map((c) => ({
              id: BigInt(c.id),
              name: c.name,
            }))}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>
      </div>
    </header>
  );
}
