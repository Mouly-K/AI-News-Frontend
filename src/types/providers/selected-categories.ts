import type { Category } from "@/types/category";

type SelectedCategoriesProviderState = {
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

type SelectedCategoriesProviderProps = {
  children: React.ReactNode;
  defaultCategories?: Category[];
};

export type {
  SelectedCategoriesProviderState,
  SelectedCategoriesProviderProps,
};
