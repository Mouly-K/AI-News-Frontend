import type { Message } from "ollama/src/interfaces.js";
import { toast } from "sonner";

const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

const ERRORS = {
  POST_FAIL: "Failed to post message",
} as const;

/**
 * Send Chat Message to the backend to trigger SSE Stream
 */
export async function sendChatMessage(
  id: string,
  data: {
    model: string;
    message: Message;
  },
): Promise<{ id: string; success: boolean }> {
  const res = await fetch(`${BASE_URL}/chat/send/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    toast.error(ERRORS.POST_FAIL, {
      description:
        error.error ||
        `${ERRORS.POST_FAIL}. Are you connected to the internet?`,
    });
    throw new Error(error.error || ERRORS.POST_FAIL);
  }

  return res.json();
}
