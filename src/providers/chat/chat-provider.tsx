import { useState } from "react";
import { initialState, ChatProviderContext } from "./helpers";

import type { ChatProviderProps } from "@/types/providers/chat";

export function ChatProvider({ children, ...props }: ChatProviderProps) {
  const [chat, setChat] = useState(initialState.chat);

  const value = {
    chat,
    setChat,
  };

  return (
    <ChatProviderContext.Provider {...props} value={value}>
      {children}
    </ChatProviderContext.Provider>
  );
}
