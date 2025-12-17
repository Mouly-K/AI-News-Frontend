import type { Dispatch, SetStateAction } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { isSelected, toggleItemSelection, type GT } from "./utils";
import { Separator } from "../ui/separator";
import { X } from "lucide-react";

export function SidebarFilter<T extends GT>({
  title,
  defaultOpen = false,
  items = [],
  selectedItems = [],
  setSelectedItems,
}: {
  title: string;
  defaultOpen?: boolean;
  items: T[];
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
}): React.ReactNode {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            {title}
            <SidebarMenuBadge>
              {selectedItems.length || items.length || 0}
            </SidebarMenuBadge>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {selectedItems.length > 0 && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setSelectedItems([])}
                      className="flex justify-between items-center"
                    >
                      <p className="mt-1">Clear {title} selection</p>
                      <X />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <Separator />
                </>
              )}
              {items?.map((item) => {
                const sourceHostname = item?.url
                  ? new URL(item?.url).hostname
                  : undefined;

                return (
                  <SidebarMenuItem
                    key={item.id}
                    onClick={() =>
                      setSelectedItems((items: T[]) =>
                        toggleItemSelection(items, item),
                      )
                    }
                    className={
                      isSelected(selectedItems, item)
                        ? "dark:bg-input/30 border rounded-md"
                        : ""
                    }
                  >
                    <SidebarMenuButton tooltip={item.name}>
                      {sourceHostname && (
                        <Avatar className="h-4 w-4">
                          <AvatarImage
                            className="object-contain"
                            src={`https://icon.horse/icon/${sourceHostname}`}
                            alt={`https://icons.duckduckgo.com/ip2/${sourceHostname}.ico`}
                          />
                        </Avatar>
                      )}
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
