import type { Dispatch, SetStateAction } from "react";
import { Check, Settings2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/lib/utils";
import { isSelected, toggleItemSelection, type GT } from "./utils";

export function BadgeFilter<T extends GT>({
  title,
  emptyMessage,
  items,
  isLoading,
  isError,
  selectedItems,
  setSelectedItems,
}: {
  title: string;
  emptyMessage: string;
  items: T[];
  isLoading: boolean;
  isError: boolean;
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
}) {
  const clearAll = () => setSelectedItems([]);

  if (isLoading)
    return (
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
    );
  else if (!items || isError) return;

  return (
    <Popover>
      <PopoverTrigger asChild className="hidden lg:flex">
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Settings2 className="mr-2 h-4 w-4" />
          {title}

          {selectedItems.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedItems.length}
              </Badge>

              <div className="hidden space-x-1 lg:flex">
                {selectedItems.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedItems.length} selectedItems
                  </Badge>
                ) : (
                  selectedItems.map((item) => (
                    <Badge
                      key={item.id}
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {item.name}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-55 p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
          <CommandList className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <CommandEmpty>{emptyMessage}</CommandEmpty>

            <CommandGroup>
              {items.map((item) => {
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() =>
                      setSelectedItems((items: T[]) =>
                        toggleItemSelection(items, item),
                      )
                    }
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected(selectedItems, item)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className="h-4 w-4 text-secondary" />
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {selectedItems.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearAll}
                    className="justify-center text-center"
                  >
                    Clear selection
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
