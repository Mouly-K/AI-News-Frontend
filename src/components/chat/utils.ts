import type { Message } from "ollama/src/interfaces.js";
import type { UseQueryResult } from "@tanstack/react-query";

import { DEFAULT_MODEL } from "@/providers/chat";

import { filterRssItems } from "@/lib/news";
import { sendChatMessage } from "@/lib/chat";
import type { ChatRequest, RssArticle } from "@/types/chat/chat-request";

import type { ChatState } from "@/types/providers/chat";
import type { RssFeed } from "@/types/rss-feed";
import type { Category } from "@/types/category";
import type { Feed } from "@/types/feed";

async function filterAndSendMessage(
  message: Message,
  chat: ChatState,
  feedQueries: UseQueryResult<RssFeed | null, Error>[],
  categories: Category[],
  feeds: Feed[],
) {
  let body: ChatRequest = {
    model:
      chat.conversations[chat.currentConversationId]?.model || DEFAULT_MODEL,
    message,
  };

  if (chat.currentConversationId === "general") {
    // Basically we want a WYSIWYG filter for items for the user
    // Same category and feed filter ensures that
    body.articles = feedQueries.reduce((articles, feedQuery) => {
      if (!feedQuery.data || !feedQuery.data?.feedUrl) return articles;

      const items = filterRssItems(feedQuery.data, "", categories, feeds).map(
        (i) => ({
          feedUrl: feedQuery.data?.feedUrl!,
          itemLink: i.link,
        }),
      );

      return [...articles, ...items];
    }, [] as RssArticle[]);
  } else if (chat.currentConversationId === "article") {
    body.articleUrl = "";
  }

  await sendChatMessage(chat.currentConversationId, body);
}

export { filterAndSendMessage };
