type SearchProviderState = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

type SearchProviderProps = {
  children: React.ReactNode;
  defaultSearchQuery?: string;
};

export type { SearchProviderState, SearchProviderProps };
