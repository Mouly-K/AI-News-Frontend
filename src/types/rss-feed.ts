import type { Category } from "./category";

type RssItem = {
  title: string;
  description: string;
  images: string[];
  // Categories that are coming from the RSS feed itself
  // Not stored in db, no need for ID
  categories: string[];
  link: string;
  pubDate: string;
  readTime: string;
};

type RssFeed = {
  title: string;
  link: string;
  lastBuildDate: string;
  description: string;
  copyright: string;
  image: string;
  categories: Category[];
  items: RssItem[];
};

export type { RssItem, RssFeed };
