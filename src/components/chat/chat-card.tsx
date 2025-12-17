import Markdown from "markdown-to-jsx/react";
import type { Message } from "ollama/src/interfaces.js";

export default function ChatCard({ role, content }: Message) {
  const isAssistant = role === "assistant";
  const cardClass = isAssistant
    ? "bg-background border w-full"
    : "dark:bg-input/30 border-input w-fit self-end";

  return (
    <div
      className={`px-3 py-2 rounded-2xl border ${cardClass} border flex text-sm`}
    >
      {role === "assistant" ? (
        <Markdown id="llm-chat-markdown">{content}</Markdown>
      ) : (
        <span className="text-muted-foreground">{content}</span>
      )}
    </div>
  );
}
