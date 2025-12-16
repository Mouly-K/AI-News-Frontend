import NewsCard from "@/components/news-card/news-card";
import NewsCardSkeleton from "@/components/news-card/news-card-skeleton";

import { useSearch } from "@/providers/search";
import { useCategories } from "@/providers/categories";
import { useSettings } from "@/providers/settings/helpers";
import { useRssFeeds } from "@/hooks/use-rssfeeds";

import { filterRssItems } from "@/lib/news";
import { useArticleModal } from "@/providers/article-modal";

export default function News() {
  const { searchQuery } = useSearch();
  const { selectedCategories } = useCategories();
  const { setArticleModal } = useArticleModal();
  const { settings } = useSettings();
  // No manual memoization required with React compiler yay
  const feedQueries = useRssFeeds(settings.feeds);

  return (
    <div className="@container/main m-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5">
      {feedQueries.map(({ isLoading, isError, data }, idx) => {
        if (isLoading) return <NewsCardSkeleton key={`skeleton-${idx}`} />;
        if (isError || !data) return;
        return filterRssItems(data, searchQuery, selectedCategories).map(
          (item, index) => (
            <NewsCard
              key={`${data.title}:${index}:${item.title!}`}
              {...item}
              source={{
                title: data.title,
                url: data.link,
                image: data.image,
              }}
              onClick={() =>
                setArticleModal({
                  articleOpen: true,
                  articleUrl: item.link,
                })
              }
            />
          ),
        );
      })}
    </div>
  );
}
