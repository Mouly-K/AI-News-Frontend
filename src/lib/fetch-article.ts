import type { Article } from "@/types/article-data";

/**
 * Fetches parsed article from the backend
 * Returns JSON containing article data.
 */
export async function fetchArticle(articleUrl: string) {
  console.info("Cache miss, fetching article");
  if (!articleUrl) throw new Error("Article URL is required");

  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const article = await fetch(
    `${BASE_URL}article?url=${encodeURIComponent(articleUrl)}`,
    {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Application-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    },
  );

  const json: Article = await article.json();
  console.log(json);
  return json;
}
