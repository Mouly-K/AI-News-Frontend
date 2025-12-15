import { useState } from "react";
import { IconSettingsSearch } from "@tabler/icons-react";

import { SiteHeader } from "@/components/site-header";
import SearchInput from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { SearchSelector } from "@/components/search-selector";
import NewsCard from "@/components/common/news-card";
import NewsCardSkeleton from "@/components/common/news-card-skeleton";

import { useRssFeeds } from "@/hooks/use-rssfeeds";
import { indexBy } from "@/utils";

import categoriesData from "@/data/categories.json";
import { filterRssItems } from "@/lib/news";

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");

  const feedQueries = useRssFeeds([
    "http://pcworld.com/index.rss",
    "https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml?edition=int",
    "https://feedx.net/rss/ap.xml",
  ]);

  const [categories, setCategories] = useState<
    {
      id: string;
      name: string;
    }[]
  >(categoriesData);

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
          <SearchSelector
            label="Warehouses"
            items={indexBy(categories, "id")}
            align="end"
            renderItem={(_, item) => (
              <>
                {/*<Flag flag={COUNTRIES[item.countryName].flag} />*/}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{item.name}</span>
                </div>
              </>
            )}
            onSelect={(genreId) =>
              setCategories((prevCategories) => {
                const selectedCategory = categories.find(
                  (g) => g.id === genreId,
                );
                if (!selectedCategory) return prevCategories;
                return [...prevCategories, selectedCategory];
              })
            }
          >
            <Button variant="outline" size="sm" className="h-8">
              <IconSettingsSearch />
              Categories
            </Button>
          </SearchSelector>
        </div>
      </SiteHeader>
      <div className="@container/main m-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {feedQueries.map(({ isLoading, isError, data }, idx) => {
          if (isLoading)
            // Minor optimization
            return <NewsCardSkeleton key={`skeleton-${idx}`} />;
          if (isError) return <div key={idx}>Error</div>;
          if (!data) return <div key={idx}>No data</div>;
          return filterRssItems(data, searchQuery).map((item, index) => (
            <NewsCard
              key={`${data.title}:${index}:${item.title!}`}
              {...item}
              source={{
                title: data.title,
                url: data.link,
                image: data.image,
              }}
            />
          ));
        })}
      </div>
    </>
  );
}
