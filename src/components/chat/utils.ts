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
import type {
  ArticleMetaData,
  ArticleModalState,
} from "@/types/providers/article-modal";

async function filterAndSendMessage(
  message: Message,
  chat: ChatState,
  feedQueries: UseQueryResult<RssFeed | null, Error>[],
  categories: Category[],
  feeds: Feed[],
  articleModal: ArticleModalState,
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
    body.articleUrl = articleModal.modalData?.itemLink;
  }

  await sendChatMessage(chat.currentConversationId, body);
}

function getArticleMetadata(
  feedQueries: UseQueryResult<RssFeed | null, Error>[],
  categories: Category[] = [],
  feeds: Feed[] = [],
) {
  return feedQueries.reduce((articles, feedQuery) => {
    if (!feedQuery.data || !feedQuery.data.feedUrl) return articles;

    const items: ArticleMetaData[] = filterRssItems(
      feedQuery.data,
      "",
      categories,
      feeds,
    ).map((i) => {
      const feedUrl = feedQuery.data?.feedUrl;
      const itemLink = i.link;
      const name = i.title || itemLink || "";
      // If same article comes via different feeds
      const id = feedUrl + ":" + itemLink;

      return { id, name, feedUrl, itemLink };
    });

    return [...articles, ...items];
  }, [] as ArticleMetaData[]);
}

export { filterAndSendMessage, getArticleMetadata };
