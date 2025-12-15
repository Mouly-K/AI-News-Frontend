type RssItem = {
  title: string;
  description: string;
  images: string[];
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
  categories: string[];
  items: RssItem[];
};

export type { RssItem, RssFeed };
