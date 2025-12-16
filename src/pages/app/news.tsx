import Masonry from "react-masonry-css";

import NewsCard from "@/components/news-card/news-card";
import NewsCardSkeleton from "@/components/news-card/news-card-skeleton";

import { useSearch } from "@/providers/search";
import { useCategories } from "@/providers/categories";
import { useSettings } from "@/providers/settings/helpers";
import { useArticleModal } from "@/providers/article-modal";
import { useRssFeeds } from "@/hooks/use-rssfeeds";

import { interleaveItems } from "@/lib/news";

import "./app.css";

export default function News() {
  const { searchQuery } = useSearch();
  const { selectedCategories } = useCategories();
  const { setArticleModal } = useArticleModal();
  const { settings } = useSettings();
  // No manual memoization required with React compiler yay
  const feedQueries = useRssFeeds(settings.feeds);

  const interleavedItems = interleaveItems(
    feedQueries,
    searchQuery,
    selectedCategories,
  );

  return (
    <Masonry
      breakpointCols={{
        default: 5,
        1900: 4,
        1500: 3,
        1150: 2,
        900: 1,
      }}
      className="flex w-full pr-3"
      columnClassName="pl-3 bg-clip-padding"
    >
      {interleavedItems.map(
        ({ item, feedData, feedIdx, itemIdx, isLoading }) => {
          if (isLoading) {
            return (
              <div key={`skeleton-${feedIdx}-${itemIdx}`} className="mt-3">
                <NewsCardSkeleton />
              </div>
            );
          }

          return (
            <NewsCard
              className="mt-3"
              key={`${feedData!.title}:${itemIdx}:${item!.title!}`}
              {...item!}
              source={feedData}
              onClick={() =>
                setArticleModal({
                  articleOpen: true,
                  articleUrl: item!.link,
                })
              }
            />
          );
        },
      )}
    </Masonry>
  );
}
