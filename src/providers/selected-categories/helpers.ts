import { createContext, useContext } from "react";
import type { SelectedCategoriesProviderState } from "@/types/providers/selected-categories";

const initialState: SelectedCategoriesProviderState = {
  selectedCategories: [],
  setSelectedCategories: () => null,
};

const SelectedCategoriesProviderContext =
  createContext<SelectedCategoriesProviderState>(initialState);

function useSelectedCategories() {
  const context = useContext(SelectedCategoriesProviderContext);

  if (context === undefined)
    throw new Error(
      "useSelectedCategories must be used within a SelectedCategoriesProvider",
    );

  return context;
}

export {
  SelectedCategoriesProviderContext,
  useSelectedCategories,
  initialState,
};
