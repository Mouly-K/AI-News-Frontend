import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import type { ChatResponse, Message } from "ollama/src/interfaces.js";

import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChatBox from "@/components/chat/chat-box";
import ChatCard from "@/components/chat/chat-card";
import Chatheader from "@/components/chat/chat-header";
import { ChatEmpty } from "@/components/chat/chat-empty";

import { useRssFeeds } from "@/hooks/use-rssfeeds";

import { useSettings } from "@/providers/settings";
import { useSelectedCategories } from "@/providers/selected-categories";
import { useSelectedFeeds } from "@/providers/selected-feeds";
import { useChat, updateChatWithNewMessage } from "@/providers/chat";
import { useArticleModal } from "@/providers/article-modal";

import { STREAM_STATUS, type StreamStatus } from "@/types/chat/stream-status";

import { isNearBottom } from "@/utils";
import { filterAndSendMessage } from "./utils";

export default function Chat() {
  const [query, setQuery] = useState("");
  // To prevent a whole lot of re-renders
  const [streamStatus, setStreamStatus] = useState<StreamStatus>(
    STREAM_STATUS.CLOSED,
  );
  const [streamText, setStreamText] = useState("");
  const streamTextRef = useRef("");
  // For scrolling to the bottom of the chat container
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { settings } = useSettings();
  const feedQueries = useRssFeeds(settings.feeds);
  const { selectedCategories } = useSelectedCategories();
  const { selectedFeeds } = useSelectedFeeds();

  const { chat, setChat } = useChat();
  const { articleModal } = useArticleModal();

  // For scrolling to the bottom of chat container
  // as text streams in
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    if (isNearBottom(container)) {
      chatBottomRef.current?.scrollIntoView({
        block: "end",
      });
    }
  }, [streamText]);

  // For switching the chat room "general" | "article"
  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3000/chat/events/${chat.currentConversationId}`,
    );

    eventSource.addEventListener("start", () => {
      setStreamStatus(STREAM_STATUS.OPEN);
      streamTextRef.current = "";
      setStreamText("");
      setQuery("");
    });

    eventSource.addEventListener("message", (e) => {
      const data = JSON.parse(e.data) as ChatResponse;
      streamTextRef.current += data.message.content;
      setStreamText((msg) => msg + data.message.content);
    });

    eventSource.addEventListener("done", (e) => {
      const fullMessage = streamTextRef.current;
      setChat((chat) => {
        return updateChatWithNewMessage(chat, {
          role: "assistant",
          content: fullMessage,
        });
      });

      setStreamStatus(STREAM_STATUS.CLOSED);
      streamTextRef.current = "";
      setStreamText("");
    });

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [chat.currentConversationId]);

  function handleSubmit() {
    if (query.trim() === "") {
      toast.info("Query empty", {
        description:
          "Type something for a tranformative news consuming experience",
      });
      return;
    }

    if (chat.currentConversationId === "article" && !articleModal.modalData) {
      toast.info("Select an article", {
        description:
          "An article must be selected in article mode. Switch to general mode for general queries",
      });
      return;
    }
    const message: Message = {
      role: "user",
      content: query,
    };

    setChat((chat) => updateChatWithNewMessage(chat, message));
    filterAndSendMessage(
      message,
      chat,
      feedQueries,
      selectedCategories,
      selectedFeeds,
      articleModal,
    );
  }

  return (
    <Drawer
      open={chat.open}
      onOpenChange={(isOpen) => setChat({ ...chat, open: isOpen })}
      direction="right"
    >
      <DrawerContent className="lg:w-xl! lg:max-w-xl! h-full rounded-2xl">
        <Chatheader />
        {chat.conversations[chat.currentConversationId].messages.length ===
          0 && <ChatEmpty />}
        <ScrollArea className="flex flex-1 overflow-y-scroll p-4">
          <div ref={chatContainerRef} className="flex flex-col gap-4 w-full">
            {chat.conversations[chat.currentConversationId].messages.map(
              (message, index) => (
                <ChatCard key={index} {...message} />
              ),
            )}
            {streamStatus === STREAM_STATUS.OPEN && (
              <ChatCard role="assistant" content={streamText} />
            )}
            <div ref={chatBottomRef} />
          </div>
        </ScrollArea>
        <DrawerFooter>
          <ChatBox
            feedQueries={feedQueries}
            query={query}
            setQuery={setQuery}
            onSubmit={handleSubmit}
            disabled={streamStatus === STREAM_STATUS.OPEN}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
