import { useQuery } from "@tanstack/react-query";
import { fetchModels } from "@/lib/fetch-models";

export function useModels() {
  return useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 2,
  });
}
