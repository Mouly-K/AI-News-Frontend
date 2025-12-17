import { Blend, BrainCircuit, X } from "lucide-react";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useChat } from "@/providers/chat";

import { deleteChat } from "@/lib/chat";
import { clearChat } from "@/providers/chat/helpers";

export default function Chatheader() {
  const { chat, setChat } = useChat();

  return (
    <DrawerHeader>
      <DrawerTitle className="flex justify-end capitalize gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full capitalize border-dashed"
              size="icon-sm"
              onClick={async () => {
                await deleteChat(chat.currentConversationId);
                setChat((chat) => clearChat(chat));
              }}
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear Chat</TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full capitalize"
              size="sm"
            >
              <Blend />
              {chat.currentConversationId}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="[--radius:0.95rem]"
          >
            {Object.keys(chat.conversations).map((conversationId) => (
              <DropdownMenuItem
                className="capitalize"
                key={conversationId}
                onClick={() =>
                  setChat((chat) => ({
                    ...chat,
                    currentConversationId: conversationId,
                  }))
                }
              >
                {conversationId}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </DrawerTitle>
      {/*For screen reader users*/}
      <DrawerDescription className="text-muted-foreground text-xl leading-7 hidden">
        Chat with AI Assistant to consume news smarter
      </DrawerDescription>
    </DrawerHeader>
  );
}
