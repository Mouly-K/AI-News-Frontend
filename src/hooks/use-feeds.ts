import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchFeeds,
  fetchFeedById,
  createFeed,
  updateFeedCategories,
  deleteFeed,
  type Feed,
} from "@/lib/api-feeds";
import { toast } from "sonner";

const FEEDS_QUERY_KEY = ["feeds"];
const FEED_QUERY_KEY = (id: bigint) => ["feed", id];

/**
 * Hook to fetch all feeds
 */
export function useFeeds() {
  return useQuery({
    queryKey: FEEDS_QUERY_KEY,
    queryFn: fetchFeeds,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

/**
 * Hook to fetch a single feed by ID
 */
export function useFeed(feedId: bigint | null) {
  return useQuery({
    queryKey: feedId ? FEED_QUERY_KEY(feedId) : ["feed", null],
    queryFn: () => fetchFeedById(feedId!),
    enabled: feedId !== null,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

/**
 * Hook to create a new feed with categories
 */
export function useCreateFeed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      url: string;
      img_url?: string;
      categoryIds: bigint[];
    }) => {
      // Create the feed
      const newFeed = await createFeed({
        name: data.name,
        url: data.url,
        img_url: data.img_url,
      });

      // Update feed categories
      await updateFeedCategories(newFeed.id, data.categoryIds);

      // Fetch the updated feed with categories
      return fetchFeedById(newFeed.id);
    },
    onSuccess: (newFeed) => {
      queryClient.setQueryData(
        FEEDS_QUERY_KEY,
        (oldData: Feed[] | undefined) => {
          return oldData ? [...oldData, newFeed] : [newFeed];
        },
      );
      toast.success("Feed added successfully");
    },
    onError: (error: Error) => {
      console.error("Error creating feed:", error);
      toast.error(error.message || "Failed to add feed");
    },
  });
}

/**
 * Hook to delete a feed
 */
export function useDeleteFeed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeed,
    onSuccess: (_, feedId) => {
      queryClient.setQueryData(
        FEEDS_QUERY_KEY,
        (oldData: Feed[] | undefined) => {
          return oldData ? oldData.filter((feed) => feed.id !== feedId) : [];
        },
      );
      toast.success("Feed deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Error deleting feed:", error);
      toast.error(error.message || "Failed to delete feed");
    },
  });
}
