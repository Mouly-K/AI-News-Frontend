import { createContext, useContext } from "react";
import type { SearchProviderState } from "@/types/providers/search";

const initialState: SearchProviderState = {
  searchQuery: "",
  setSearchQuery: () => null,
};

const SearchProviderContext = createContext<SearchProviderState>(initialState);

function useSearch() {
  const context = useContext(SearchProviderContext);

  if (context === undefined)
    throw new Error("useSearch must be used within a SearchProvider");

  return context;
}

export { SearchProviderContext, useSearch, initialState };
