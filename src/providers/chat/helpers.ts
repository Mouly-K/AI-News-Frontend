import { createContext, useContext } from "react";
import type { ChatProviderState, ChatState } from "@/types/providers/chat";
import type { Message } from "ollama/src/interfaces.js";

const DEFAULT_MODEL = "gemma3:270m";

const initialState: ChatProviderState = {
  chat: {
    conversations: {
      general: {
        title: "General",
        model: DEFAULT_MODEL,
        messages: [],
      },
    },
    currentConversationId: "general",
    open: false,
  },
  setChat: () => null,
};

const ChatProviderContext = createContext<ChatProviderState>(initialState);

function useChat() {
  const context = useContext(ChatProviderContext);

  if (context === undefined)
    throw new Error("useChat must be used within an ChatProvider");

  return context;
}

function updateChatWithNewMessage(
  chat: ChatState,
  message: Message,
): ChatState {
  const convos = chat.conversations;
  const currId = chat.currentConversationId;
  return {
    ...chat,
    conversations: {
      ...convos,
      [currId]: {
        ...convos[currId],
        messages: [...convos[currId].messages, message],
      },
    },
  };
}

export {
  DEFAULT_MODEL,
  ChatProviderContext,
  useChat,
  initialState,
  updateChatWithNewMessage,
};
