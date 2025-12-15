import { createContext, useContext } from "react";
import type { CategoriesProviderState } from "@/types/providers/categories";

const initialState: CategoriesProviderState = {
  selectedCategories: [],
  setSelectedCategories: () => null,
};

const CategoriesProviderContext =
  createContext<CategoriesProviderState>(initialState);

function useCategories() {
  const context = useContext(CategoriesProviderContext);

  if (context === undefined)
    throw new Error("useCategories must be used within a CategoriesProvider");

  return context;
}

export { CategoriesProviderContext, useCategories, initialState };
