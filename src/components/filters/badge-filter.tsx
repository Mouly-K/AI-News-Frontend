import type { Dispatch, SetStateAction } from "react";
import { Check, Settings2, X } from "lucide-react";

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
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { isSelected, toggleItemSelection, type GT } from "./utils";

export function FilterItem<T extends GT>({
  item,
  selectedItems,
  setSelectedItems,
}: {
  item: T;
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
}) {
  const sourceHostname = item?.url ? new URL(item?.url).hostname : undefined;

  return (
    <CommandItem
      key={item.id}
      onSelect={() =>
        setSelectedItems((items: T[]) => toggleItemSelection(items, item))
      }
    >
      {sourceHostname && (
        <Avatar className="h-4 w-4">
          <AvatarImage
            className="object-contain"
            src={`https://icon.horse/icon/${sourceHostname}`}
            alt={`https://icons.duckduckgo.com/ip2/${sourceHostname}.ico`}
          />
        </Avatar>
      )}
      <span className="text-sm">{item.name}</span>
      <Check
        className={cn(
          "ml-auto",
          isSelected(selectedItems, item) ? "opacity-100" : "opacity-0",
        )}
      />
    </CommandItem>
  );
}

export function BadgeFilter<T extends GT>({
  title,
  emptyMessage,
  items,
  isLoading,
  isError,
  selectedItems,
  setSelectedItems,
  variant = "default",
}: {
  title: string;
  emptyMessage: string;
  items: T[];
  isLoading: boolean;
  isError: boolean;
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
  variant?: "default" | "hidden";
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

  const triggerClass =
    variant === "default" ? "border-dashed" : "rounded-full font-medium";

  return (
    <>
      {(variant === "default" || selectedItems.length > 2) && (
        <Popover>
          <PopoverTrigger asChild className="hidden lg:flex">
            <Button
              variant="outline"
              size="sm"
              className={`h-8 ${triggerClass}`}
            >
              {variant === "default" ? (
                <Settings2 className="mr-2 h-4 w-4" />
              ) : (
                <Badge className="h-4 min-w-4 rounded-full px-1 tabular-nums">
                  {selectedItems.length}
                </Badge>
              )}

              {title}

              {variant === "default" && selectedItems.length > 0 && (
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
                        className="rounded-sm px-1 font-normal cursor-pointer"
                      >
                        {selectedItems.length + " selected items"}
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
                  {items.map((item) => (
                    <FilterItem
                      key={item.id}
                      item={item}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                    />
                  ))}
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
      )}
      {variant === "hidden" &&
        selectedItems.length <= 2 &&
        selectedItems.map((item) => {
          const sourceHostname = item.url ? new URL(item.url).hostname : null;

          return (
            <Button
              key={item.id}
              variant="secondary"
              size="sm"
              className="h-8 px-3 rounded-full tabular-nums"
              onClick={() =>
                setSelectedItems((items: T[]) =>
                  toggleItemSelection(items, item),
                )
              }
            >
              {sourceHostname && (
                <Avatar className="h-4 w-4">
                  <AvatarImage
                    className="object-contain"
                    src={`https://icon.horse/icon/${sourceHostname}`}
                    alt={`https://icons.duckduckgo.com/ip2/${sourceHostname}.ico`}
                  />
                </Avatar>
              )}
              {item.name}
              <X />
            </Button>
          );
        })}
    </>
  );
}
