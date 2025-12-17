import type { Category } from "./category";
import type { Feed } from "./feed";

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
