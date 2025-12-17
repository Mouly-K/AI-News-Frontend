import { IconAt } from "@tabler/icons-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useModels } from "@/hooks/use-models";
import { useChat } from "@/providers/chat";

interface ChatBoxProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  disabled: boolean;
}

export default function ChatBox({
  query,
  setQuery,
  onSubmit,
  disabled = false,
}: ChatBoxProps) {
  const { chat, setChat } = useChat();
  const { data: models, isLoading, isError } = useModels();

  return (
    <>
      <InputGroup className="rounded-2xl">
        <InputGroupAddon align="block-start">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="outline"
                className="rounded-full font-medium"
                size="sm"
                disabled={disabled}
              >
                <IconAt />
                Add context
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Add context. You can add a category, particular source or a
                specific article
              </p>
            </TooltipContent>
          </Tooltip>
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
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <Separator orientation="vertical" className="h-4!" />
          <InputGroupButton
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
