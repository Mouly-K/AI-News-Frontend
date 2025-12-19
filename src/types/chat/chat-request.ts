import type { Message } from "ollama/src/interfaces.js";

type RssArticle = {
  feedUrl: string;
  itemLink: string;
};

type ChatRequest = {
  model: string;
  message: Message;
  articles?: RssArticle[];
  articleUrl?: string;
};

export type { RssArticle, ChatRequest };
