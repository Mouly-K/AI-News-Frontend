import Masonry from "react-masonry-css";

import NewsCard from "@/components/news-card/news-card";
import NewsCardSkeleton from "@/components/news-card/news-card-skeleton";

import { useSearch } from "@/providers/search";
import { useSelectedCategories } from "@/providers/selected-categories";
import { useSettings } from "@/providers/settings/helpers";
import { useArticleModal } from "@/providers/article-modal";
import { useSelectedFeeds } from "@/providers/selected-feeds";
import { useChat } from "@/providers/chat";

import { useRssFeeds } from "@/hooks/use-rssfeeds";

import { interleaveItems } from "@/lib/news";

export default function News() {
  const { searchQuery } = useSearch();
  const { selectedCategories } = useSelectedCategories();
  const { selectedFeeds } = useSelectedFeeds();
  const { setArticleModal } = useArticleModal();
  const { setChat } = useChat();
  const { settings } = useSettings();
  // No manual memoization required with React compiler yay
  const feedQueries = useRssFeeds(settings.feeds);

  const interleavedItems = interleaveItems(
    feedQueries,
    searchQuery,
    selectedCategories,
    selectedFeeds,
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
              onClick={() => {
                setArticleModal({
                  articleOpen: true,
                  modalData: {
                    id: `${feedData?.link}:${item?.link}`,
                    name: item!.title!,
                    feedUrl: feedData!.link,
                    itemLink: item!.link,
                  },
                });
                setChat((chat) => ({
                  ...chat,
                  currentConversationId: "article",
                }));
              }}
            />
          );
        },
      )}
    </Masonry>
  );
}
