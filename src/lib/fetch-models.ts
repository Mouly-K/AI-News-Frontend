import type { ModelResponse } from "ollama/src/interfaces.js";

/**
 * Fetches the list of available models from the backend.
 */
export async function fetchModels(): Promise<ModelResponse[]> {
  console.info("Cache miss, fetching models");
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const response = await fetch(`${BASE_URL}/chat/models`, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Application-Type": "application/json",
    },
  });

  const json: ModelResponse[] = (await response.json())
    .models as ModelResponse[];
  console.log(json);
  return json;
}
