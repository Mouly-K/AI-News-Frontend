import { useState } from "react";
import { useSearchParams } from "react-router";
import { IconSettingsSearch } from "@tabler/icons-react";

import { useArticle } from "@/hooks/use-article";
import { SiteHeader } from "@/components/site-header";
import { SearchSelector } from "@/components/search-selector";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search-input";
import { indexBy } from "@/utils";

import categoriesData from "@/data/categories.json";

export default function Article() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = useArticle(
    decodeURIComponent(searchParams.get("url") || ""),
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<
    {
      id: string;
      name: string;
    }[]
  >(categoriesData);

  return (
    <>
      <SiteHeader>
        <h1 className="text-base font-medium">Article</h1>
        <div className="ml-auto flex items-center gap-2">
          <SearchInput
            placeholderKey="article"
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
      {data?.content && (
        <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            {data?.title}
          </h1>
          <p className="text-muted-foreground text-xl leading-7">
            {data.excerpt}
          </p>
          <article
            id="readability-page"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></article>
        </div>
      )}
    </>
  );
}
