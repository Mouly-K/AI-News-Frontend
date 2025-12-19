import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchInput from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { BadgeFilter } from "@/components/filters/badge-filter";

import { useSearch } from "@/providers/search";
import { useSelectedCategories } from "@/providers/selected-categories";
import { useSelectedFeeds } from "@/providers/selected-feeds";

import { useFeeds } from "@/hooks/use-feeds";
import { useCategories } from "@/hooks/use-categories";
import { useChat } from "@/providers/chat";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { bindKey } from "@/utils";

export function SiteHeader() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { selectedCategories, setSelectedCategories } = useSelectedCategories();
  const { selectedFeeds, setSelectedFeeds } = useSelectedFeeds();
  const { setChat } = useChat();

  const chatRef = useRef<HTMLButtonElement>(null);

  useEffect(bindKey(chatRef, ";"), []);

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

  return (
    <header className="flex h-(--header-height) rounded-t-xl bg-background sticky top-0 z-50 w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <SearchInput
          placeholderKey="articles"
          value={searchQuery}
          onChange={setSearchQuery}
          debounce={250}
          className="h-8"
        />
        <div className="ml-auto flex items-center gap-2">
          <BadgeFilter
            title="Category"
            emptyMessage="No categories found."
            items={categories}
            isLoading={categoriesLoading}
            isError={categoriesError}
            selectedItems={selectedCategories}
            setSelectedItems={setSelectedCategories}
          />
          <BadgeFilter
            title="Sources"
            emptyMessage="No sources found."
            items={feeds}
            isLoading={feedsLoading}
            isError={feedsError}
            selectedItems={selectedFeeds}
            setSelectedItems={setSelectedFeeds}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                ref={chatRef}
                className="h-8"
                onClick={() =>
                  setChat((chat) => ({ ...chat, open: !chat.open }))
                }
              >
                <MessageCircle />
                <span>Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Use AI to consume news smarter</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
