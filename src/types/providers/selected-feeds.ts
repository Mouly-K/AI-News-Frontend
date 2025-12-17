import type { Feed } from "@/types/feed";

type SelectedFeedsProviderState = {
  selectedFeeds: Feed[];
  setSelectedFeeds: React.Dispatch<React.SetStateAction<Feed[]>>;
};

type SelectedFeedsProviderProps = {
  children: React.ReactNode;
  defaultFeeds?: Feed[];
};

export type { SelectedFeedsProviderProps, SelectedFeedsProviderState };
