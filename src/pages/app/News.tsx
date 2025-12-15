import { useState } from "react";

import { SiteHeader } from "@/components/site-header";
import SearchInput from "@/components/ui/search-input";
import NewsCard from "@/components/common/news-card";
import NewsCardSkeleton from "@/components/common/news-card-skeleton";

import { useRssFeeds } from "@/hooks/use-rssfeeds";

import { filterRssItems } from "@/lib/news";
import type { Category } from "@/types/category";
import categoriesData from "@/data/categories.json";
import { CategoryFilter } from "@/components/category-filter";
import { useSettings } from "@/providers/settings/helpers";
import Article from "./article/Article";

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  // Maintain modal states/data separately to prevent unnecessary re-renders
  const [articleOpen, setArticleOpen] = useState(false);
  const [articleUrl, setArticleUrl] = useState<string | null>(null);
  const { settings } = useSettings();
  // No manual memoization required with React compiler yay
  const feedQueries = useRssFeeds(settings.feeds);

  return (
    <>
      <SiteHeader>
        <h1 className="text-base font-medium">Articles</h1>
        <div className="ml-auto flex items-center gap-2">
          <SearchInput
            placeholderKey="articles"
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            debounce={250}
            className="h-8"
          />
          <CategoryFilter
            title="Category"
            categories={categoriesData}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>
      </SiteHeader>
      <div className="@container/main m-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5">
        {feedQueries.map(({ isLoading, isError, data }, idx) => {
          if (isLoading) return <NewsCardSkeleton key={`skeleton-${idx}`} />;
          if (isError || !data) return;
          return filterRssItems(data, searchQuery).map((item, index) => (
            <NewsCard
              key={`${data.title}:${index}:${item.title!}`}
              {...item}
              source={{
                title: data.title,
                url: data.link,
                image: data.image,
              }}
              onClick={() => {
                setArticleUrl(item.link);
                setArticleOpen(true);
              }}
            />
          ));
        })}
      </div>
      <Article
        url={articleUrl}
        isOpen={articleOpen}
        setIsOpen={setArticleOpen}
      />
    </>
  );
}
