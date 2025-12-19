import { useEffect, useRef } from "react";
import { ArrowUpIcon, BrainCircuit } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

import { BadgeFilter } from "@/components/filters/badge-filter";
import { ChatContext } from "@/components/chat/chat-context";

import { useModels } from "@/hooks/use-models";
import { useFeeds } from "@/hooks/use-feeds";
import { useCategories } from "@/hooks/use-categories";

import { useChat } from "@/providers/chat";
import { useSearch } from "@/providers/search";
import { useSelectedCategories } from "@/providers/selected-categories";
import { useSelectedFeeds } from "@/providers/selected-feeds";

import type { UseQueryResult } from "@tanstack/react-query";
import type { RssFeed } from "@/types/rss-feed";
import { getArticleMetadata } from "./utils";
import { useArticleModal } from "@/providers/article-modal";
import type { ArticleMetaData } from "@/types/providers/article-modal";

interface ChatBoxProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  disabled: boolean;
  feedQueries: UseQueryResult<RssFeed | null, Error>[];
}

export default function ChatBox({
  query,
  setQuery,
  onSubmit,
  disabled = false,
  feedQueries,
}: ChatBoxProps) {
  const { searchQuery, setSearchQuery } = useSearch();
  const { selectedCategories, setSelectedCategories } = useSelectedCategories();
  const { selectedFeeds, setSelectedFeeds } = useSelectedFeeds();
  const { chat, setChat } = useChat();
  const { articleModal, setArticleModal } = useArticleModal();

  const { data: models, isLoading, isError } = useModels();
  const {
    data: feeds = [],
    isLoading: feedsLoading,
    isError: feedsError,
  } = useFeeds();
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  const sendRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        sendRef.current?.click();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <InputGroup className="rounded-2xl">
        <InputGroupAddon align="block-start">
          <ChatContext
            disabled={disabled}
            chat={chat}
            setChat={setChat}
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            feeds={feeds}
            selectedFeeds={selectedFeeds}
            setSelectedFeeds={setSelectedFeeds}
            articleModal={articleModal}
            setArticleModal={setArticleModal}
            feedQueries={feedQueries}
          />
          <div className="flex flex-1 items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {chat.currentConversationId === "general" && (
              <>
                <BadgeFilter
                  variant="hidden"
                  title="Categories"
                  emptyMessage="No categories found."
                  items={categories}
                  isLoading={categoriesLoading}
                  isError={categoriesError}
                  selectedItems={selectedCategories}
                  setSelectedItems={setSelectedCategories}
                />
                <BadgeFilter
                  variant="hidden"
                  title="Sources"
                  emptyMessage="No sources found."
                  items={feeds}
                  isLoading={feedsLoading}
                  isError={feedsError}
                  selectedItems={selectedFeeds}
                  setSelectedItems={setSelectedFeeds}
                />
              </>
            )}
            {chat.currentConversationId === "article" && (
              <BadgeFilter
                variant="hidden"
                type="single-select"
                title="Articles"
                emptyMessage="No articles found"
                items={getArticleMetadata(feedQueries)}
                isLoading={feedQueries.some((feedQuery) => feedQuery.isLoading)}
                isError={feedQueries.some((feedQuery) => feedQuery.isError)}
                selectedItems={
                  articleModal.modalData ? [articleModal.modalData] : []
                }
                setSelectedItems={(items: ArticleMetaData[]) => {
                  if (items.length === 0) {
                    setChat((chat) => ({
                      ...chat,
                      currentConversationId: "general",
                    }));
                    return;
                  }
                  setArticleModal((modalState) => ({
                    ...modalState,
                    modalData: items[0],
                  }));
                  setChat((chat) => ({
                    ...chat,
                    currentConversationId: "article",
                  }));
                }}
              />
            )}
          </div>
        </InputGroupAddon>
        <InputGroupTextarea
          placeholder="Give me a brief summary about today's news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled}
        />
        <InputGroupAddon align="block-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                className="rounded-full"
                size="sm"
                disabled={disabled || isLoading}
              >
                <BrainCircuit />
                {chat.conversations[chat.currentConversationId].model}
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="[--radius:0.95rem]"
            >
              {models?.map((model) => (
                <DropdownMenuItem
                  key={model.model}
                  onClick={() =>
                    setChat((chat) => ({
                      ...chat,
                      conversations: {
                        ...chat.conversations,
                        [chat.currentConversationId]: {
                          ...chat.conversations[chat.currentConversationId],
                          model: model.model,
                        },
                      },
                    }))
                  }
                >
                  {model.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <span>+</span>
              <Kbd>⏎</Kbd>
            </KbdGroup>
          </InputGroupText>
          <Separator orientation="vertical" className="h-4!" />
          <InputGroupButton
            ref={sendRef}
            variant="default"
            className="rounded-full"
            size="icon-xs"
            onClick={onSubmit}
            disabled={disabled}
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
