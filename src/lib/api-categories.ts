import type { Category } from "@/types/category";
import { toast } from "sonner";

const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

const ERRORS = {
  FETCH_FAIL: "Failed to fetch categories",
  CREATE_FAIL: "Failed to create category",
  DELETE_FAIL: "Failed to delete category",
} as const;

const SUCCESS = {
  CREATE: "Category created successfully",
  DELETE: "Category deleted successfully",
} as const;

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`);

  if (!res.ok) {
    toast.error(ERRORS.FETCH_FAIL, {
      description: `${ERRORS.FETCH_FAIL}. Are you connected to the internet?`,
    });
    throw new Error(ERRORS.FETCH_FAIL);
  }

  return res.json();
}

/**
 * Create a new category
 */
export async function createCategory(name: string): Promise<Category> {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const error = await res.json();
    toast.error(ERRORS.CREATE_FAIL, {
      description:
        error.error ||
        `${ERRORS.CREATE_FAIL}. Are you connected to the internet?`,
    });
    throw new Error(error.error || ERRORS.CREATE_FAIL);
  }

  toast.success(SUCCESS.CREATE);
  return res.json();
}

/**
 * Delete a category
 */
export async function deleteCategory(categoryId: bigint): Promise<void> {
  const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    toast.error(ERRORS.DELETE_FAIL, {
      description: `${ERRORS.DELETE_FAIL}. Are you connected to the internet?`,
    });
    throw new Error(ERRORS.DELETE_FAIL);
  }

  toast.success(SUCCESS.DELETE);
}
