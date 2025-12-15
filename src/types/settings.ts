import type { Category } from "./category";

const DEFAULT_FEEDS = [
  "http://pcworld.com/index.rss",
  "https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml?edition=int",
  "https://feedx.net/rss/ap.xml",
];

const THEMES = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
} as const;

type Theme = (typeof THEMES)[keyof typeof THEMES];

type Settings = {
  theme: Theme;
  feeds: string[];
  categories: Category[];
};

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings?: Settings;
  storageKey?: string;
};

type SettingsProviderState = {
  settings: Settings;
  setSettings: (callback: (oldSettings: Settings) => Settings) => void;
};

export { THEMES, DEFAULT_FEEDS };
export type { Theme, Settings, SettingsProviderProps, SettingsProviderState };
