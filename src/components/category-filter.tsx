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

import { useCategories } from "@/hooks/use-categories";

import type { Category } from "@/types/category";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  title?: string;
  selected: Category[];
  onChange: (categories: Category[]) => void;
}

const isSelected = (selected: Category[], category: Category) =>
  selected.some((c) => c.id === category.id);

export function CategoryFilter({
  title = "Categories",
  selected,
  onChange,
}: CategoryFilterProps) {
  const { data: categories, isLoading, isError } = useCategories();

  const toggleCategory = (category: Category) => {
    if (isSelected(selected, category)) {
      onChange(selected.filter((c) => c.id !== category.id));
    } else {
      onChange([...selected, category]);
    }
  };

  const clearAll = () => onChange([]);

  if (isLoading)
    return (
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
    );
  else if (!categories || isError) return;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Settings2 className="mr-2 h-4 w-4" />
          {title}

          {selected.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selected.length}
              </Badge>

              <div className="hidden space-x-1 lg:flex">
                {selected.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selected.length} selected
                  </Badge>
                ) : (
                  selected.map((category) => (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {category.name}
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
            <CommandEmpty>No categories found.</CommandEmpty>

            <CommandGroup>
              {categories.map((category) => {
                return (
                  <CommandItem
                    key={category.id}
                    onSelect={() => toggleCategory(category)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected(selected, category)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{category.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {selected.length > 0 && (
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
