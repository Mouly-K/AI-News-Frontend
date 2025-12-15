import type { Category } from "@/types/category";
import { toast } from "sonner";

const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

const ERRORS = {
  FETCH_FAIL: "Failed to fetch feeds",
  FETCH_ONE_FAIL: "Failed to fetch feed",
  CREATE_FAIL: "Failed to create feed",
  UPDATE_CATEGORIES_FAIL: "Failed to update feed categories",
  DELETE_FAIL: "Failed to delete feed",
} as const;

const SUCCESS = {
  CREATE: "Feed created successfully",
  DELETE: "Feed deleted successfully",
} as const;

const defaultHeaders = {
  "Access-Control-Allow-Origin": BASE_URL,
};

export interface Feed {
  id: bigint;
  name: string;
  url: string;
  img_url: string | null;
  created_at: string;
  categories: Category[];
}

/**
 * Fetch all feeds
 */
export async function fetchFeeds(): Promise<Feed[]> {
  const res = await fetch(`${BASE_URL}/feeds`, {
    headers: defaultHeaders,
  });

  if (!res.ok) {
    toast.error(ERRORS.FETCH_FAIL, {
      description: `${ERRORS.FETCH_FAIL}. Are you connected to the internet?`,
    });
    throw new Error(ERRORS.FETCH_FAIL);
  }

  return res.json();
}

/**
 * Fetch a single feed by ID
 */
export async function fetchFeedById(id: bigint): Promise<Feed> {
  const res = await fetch(`${BASE_URL}/feeds/${id}`, {
    headers: defaultHeaders,
  });

  if (!res.ok) {
    toast.error(ERRORS.FETCH_ONE_FAIL, {
      description: `${ERRORS.FETCH_ONE_FAIL}. Are you connected to the internet?`,
    });
    throw new Error(ERRORS.FETCH_ONE_FAIL);
  }

  return res.json();
}

/**
 * Create a new feed
 */
export async function createFeed(data: {
  name: string;
  url: string;
  img_url?: string;
}): Promise<Feed> {
  const res = await fetch(`${BASE_URL}/feeds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...defaultHeaders,
    },
    body: JSON.stringify(data),
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
 * Update feed categories
 */
export async function updateFeedCategories(
  feedId: bigint,
  categoryIds: bigint[],
): Promise<void> {
  const res = await fetch(`${BASE_URL}/feeds/${feedId}/categories`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...defaultHeaders,
    },
    body: JSON.stringify({
      categoryIds,
    }),
  });

  if (!res.ok) {
    toast.error(ERRORS.UPDATE_CATEGORIES_FAIL, {
      description: `${ERRORS.UPDATE_CATEGORIES_FAIL}. Are you connected to the internet?`,
    });
    throw new Error(ERRORS.UPDATE_CATEGORIES_FAIL);
  }
}

/**
 * Delete a feed
 */
export async function deleteFeed(id: bigint): Promise<void> {
  const res = await fetch(`${BASE_URL}/feeds/${id}`, {
    method: "DELETE",
    headers: defaultHeaders,
  });

  if (!res.ok) {
    toast.error(ERRORS.DELETE_FAIL, {
      description: `${ERRORS.DELETE_FAIL}. Are you connected to the internet?`,
    });
    throw new Error(ERRORS.DELETE_FAIL);
  }

  toast.success(SUCCESS.DELETE);
}
