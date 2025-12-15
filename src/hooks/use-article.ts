import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "@/lib/fetch-article";

export function useArticle(articleUrl: string) {
  return useQuery({
    queryKey: ["article", articleUrl],
    queryFn: () => fetchArticle(articleUrl),
    enabled: !!articleUrl,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 2,
  });
}
