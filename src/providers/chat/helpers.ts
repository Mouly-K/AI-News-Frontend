import { createContext, useContext } from "react";
import type { ChatProviderState, ChatState } from "@/types/providers/chat";
import type { Message } from "ollama/src/interfaces.js";

// Using smaller parameter gemma for general chat and queries
// Using larger parameter gpt-oss for article chat since it's better with more data
const DEFAULT_MODEL = "gpt-oss:20b";
const DEFAULT_ARTICLE_MODEL = "gpt-oss:20b";

const initialState: ChatProviderState = {
  chat: {
    conversations: {
      general: {
        model: DEFAULT_MODEL,
        messages: [],
      },
      article: {
        model: DEFAULT_ARTICLE_MODEL,
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

function clearChat(chat: ChatState): ChatState {
  const convos = chat.conversations;
  const currId = chat.currentConversationId;
  return {
    ...chat,
    conversations: {
      ...convos,
      [currId]: {
        ...convos[currId],
        messages: [],
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
  clearChat,
};
