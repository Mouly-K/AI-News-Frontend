import { useState } from "react";
import { initialState, CategoriesProviderContext } from "./helpers";

import type { CategoriesProviderProps } from "@/types/providers/categories";
import type { Category } from "@/types/category";

export function CategoriesProvider({
  children,
  defaultCategories = initialState.selectedCategories,
  ...props
}: CategoriesProviderProps) {
  const [selectedCategories, setSelectedCategories] =
    useState<Category[]>(defaultCategories);

  const value = {
    selectedCategories,
    setSelectedCategories,
  };

  return (
    <CategoriesProviderContext.Provider {...props} value={value}>
      {children}
    </CategoriesProviderContext.Provider>
  );
}
