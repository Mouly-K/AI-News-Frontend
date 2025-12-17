import { useState } from "react";
import { initialState, SelectedCategoriesProviderContext } from "./helpers";

import type { SelectedCategoriesProviderProps } from "@/types/providers/selected-categories";
import type { Category } from "@/types/category";

export function SelectedCategoriesProvider({
  children,
  defaultCategories = initialState.selectedCategories,
  ...props
}: SelectedCategoriesProviderProps) {
  const [selectedCategories, setSelectedCategories] =
    useState<Category[]>(defaultCategories);

  const value = {
    selectedCategories,
    setSelectedCategories,
  };

  return (
    <SelectedCategoriesProviderContext.Provider {...props} value={value}>
      {children}
    </SelectedCategoriesProviderContext.Provider>
  );
}
