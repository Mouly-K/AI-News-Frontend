import { useState } from "react";
import { initialState, SearchProviderContext } from "./helpers";

import type { SearchProviderProps } from "@/types/providers/search";

export function SearchProvider({
  children,
  defaultSearchQuery = initialState.searchQuery,
  ...props
}: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState<string>(defaultSearchQuery);

  const value = {
    searchQuery,
    setSearchQuery,
  };

  return (
    <SearchProviderContext.Provider {...props} value={value}>
      {children}
    </SearchProviderContext.Provider>
  );
}
