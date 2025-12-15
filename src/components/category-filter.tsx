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
import { cn } from "@/lib/utils";

import type { Category } from "@/types/category";

interface CategoryFilterProps {
  title?: string;
  categories: Category[];
  selected: Category[];
  onChange: (categories: Category[]) => void;
}

export function CategoryFilter({
  title = "Categories",
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const isSelected = (category: Category) =>
    selected.some((c) => c.id === category.id);

  const toggleCategory = (category: Category) => {
    if (isSelected(category)) {
      onChange(selected.filter((c) => c.id !== category.id));
    } else {
      onChange([...selected, category]);
    }
  };

  const clearAll = () => onChange([]);

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
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>

            <CommandGroup>
              {categories.map((category) => {
                const selected = isSelected(category);
                const Icon = category.icon;

                return (
                  <CommandItem
                    key={category.id}
                    onSelect={() => toggleCategory(category)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>

                    {Icon && (
                      <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}

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
