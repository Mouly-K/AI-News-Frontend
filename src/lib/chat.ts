import type { ChatRequest } from "@/types/chat/chat-request";
import { toast } from "sonner";

const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

const ERRORS = {
  POST_FAIL: "Failed to post message",
  DELETE_FAIL: "Failed to delete chat",
} as const;

/**
 * Send Chat Message to the backend to trigger SSE Stream
 */
export async function sendChatMessage(
  id: string,
  data: ChatRequest,
): Promise<{ id: string; success: boolean }> {
  console.log("Sending data: ", data);

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

export async function deleteChat(id: string) {
  const res = await fetch(`${BASE_URL}/chat/delete/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    toast.error(ERRORS.DELETE_FAIL, {
      description:
        error.error ||
        `${ERRORS.DELETE_FAIL}. Are you connected to the internet?`,
    });
    throw new Error(error.error || ERRORS.DELETE_FAIL);
  }
}
