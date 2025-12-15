import type { Category } from "./category";
import type { Feed } from "./feed";

// const DEFAULT_FEEDS = [
//   "http://pcworld.com/index.rss",
//   "https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml?edition=int",
//   "https://feedx.net/rss/ap.xml",
// ];

const THEMES = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
} as const;

type Theme = (typeof THEMES)[keyof typeof THEMES];

type Settings = {
  theme: Theme;
  feeds: Feed[];
  categories: Category[];
};

export { THEMES };
export type { Theme, Settings };
