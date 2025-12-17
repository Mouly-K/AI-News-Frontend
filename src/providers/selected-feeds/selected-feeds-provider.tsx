import { useState } from "react";
import { initialState, SelectedFeedsProviderContext } from "./helpers";

import type { SelectedFeedsProviderProps } from "@/types/providers/selected-feeds";
import type { Feed } from "@/types/feed";

export function SelectedFeedsProvider({
  children,
  defaultFeeds = initialState.selectedFeeds,
  ...props
}: SelectedFeedsProviderProps) {
  const [selectedFeeds, setSelectedFeeds] = useState<Feed[]>(defaultFeeds);

  const value = {
    selectedFeeds,
    setSelectedFeeds,
  };

  return (
    <SelectedFeedsProviderContext.Provider {...props} value={value}>
      {children}
    </SelectedFeedsProviderContext.Provider>
  );
}
