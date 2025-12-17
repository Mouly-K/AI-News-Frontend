import { IconMessageChatbot } from "@tabler/icons-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ChatEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconMessageChatbot />
        </EmptyMedia>
        <EmptyTitle>No Chats Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t had any conversations yet. Get started by asking a
          question.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
