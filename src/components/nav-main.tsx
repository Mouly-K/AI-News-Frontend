import { MessageCircle } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useChat } from "@/providers/chat";

export function NavMain() {
  const { chat, setChat } = useChat();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Open Chat"
              onClick={() => setChat((chat) => ({ ...chat, open: !chat.open }))}
            >
              <MessageCircle />
              <span>Toggle Chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
