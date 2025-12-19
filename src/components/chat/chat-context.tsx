import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { IconAt } from "@tabler/icons-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InputGroupButton } from "@/components/ui/input-group";

import type { Category } from "@/types/category";
import type { Feed } from "@/types/feed";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterItem } from "@/components/filters/badge-filter";

export function ChatContext({
  disabled,
  categories,
  selectedCategories,
  setSelectedCategories,
  feeds,
  selectedFeeds,
  setSelectedFeeds,
}: {
  disabled: boolean;
  categories: Category[];
  selectedCategories: Category[];
  setSelectedCategories: Dispatch<SetStateAction<Category[]>>;
  feeds: Feed[];
  selectedFeeds: Feed[];
  setSelectedFeeds: Dispatch<SetStateAction<Feed[]>>;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <InputGroupButton
              variant="outline"
              className="rounded-full font-medium"
              size={
                selectedCategories.length || selectedFeeds.length
                  ? "icon-sm"
                  : "sm"
              }
              disabled={disabled}
            >
              <IconAt />
              {selectedCategories.length || selectedFeeds.length
                ? ""
                : "Add context"}
            </InputGroupButton>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>
          <p>Choose a category, source or article</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent asChild>
        <Command className="rounded-lg border shadow-md md:min-w-112.5 p-0">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList asChild>
            <ScrollArea>
              <CommandEmpty>No matching context found.</CommandEmpty>
              <CommandGroup heading="Sources">
                {feeds.map((feed) => (
                  <FilterItem
                    key={feed.id}
                    item={feed}
                    selectedItems={selectedFeeds}
                    setSelectedItems={setSelectedFeeds}
                  />
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Categories">
                {categories.map((category) => (
                  <FilterItem
                    key={category.id}
                    item={category}
                    selectedItems={selectedCategories}
                    setSelectedItems={setSelectedCategories}
                  />
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
