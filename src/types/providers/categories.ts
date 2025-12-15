import type { Category } from "../category";

type CategoriesProviderState = {
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

type CategoriesProviderProps = {
  children: React.ReactNode;
  defaultCategories?: Category[];
};

export type { CategoriesProviderState, CategoriesProviderProps };
