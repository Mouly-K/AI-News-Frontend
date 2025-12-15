import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, createCategory } from "@/lib/api-categories";
import type { Category } from "@/types/category";
import { toast } from "sonner";

const CATEGORIES_QUERY_KEY = ["categories"];

/**
 * Hook to fetch all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

/**
 * Hook to create a new category
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: (newCategory: Category) => {
      // Update the categories list
      queryClient.setQueryData(CATEGORIES_QUERY_KEY, (old: Category[] | undefined) => {
        if (!old) return [newCategory];
        return [...old, newCategory];
      });
      toast.success("Category added successfully");
    },
    onError: (error: Error) => {
      console.error("Error creating category:", error);
      toast.error(error.message || "Failed to add category");
    },
  });
}
