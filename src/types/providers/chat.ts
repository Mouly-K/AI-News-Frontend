import type { Message } from "ollama/src/interfaces.js";

export type Conversation = {
  model?: string;
  messages: Message[];
};

export type ChatState = {
  open: boolean;
  conversations: Record<string, Conversation>;
  currentConversationId: string;
};

export type ChatProviderState = {
  chat: ChatState;
  setChat: React.Dispatch<React.SetStateAction<ChatState>>;
};

export type ChatProviderProps = {
  children: React.ReactNode;
};
