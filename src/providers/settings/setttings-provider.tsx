import { useEffect, useState } from "react";
import { initialState, SettingsProviderContext } from "./helpers";

import type { SettingsProviderProps } from "@/types/providers/settings";

import { THEMES, type Settings } from "@/types/settings";
import { fetchFeeds } from "@/lib/api-feeds";
import { fetchCategories } from "@/lib/api-categories";

export function SettingsProvider({
  children,
  defaultSettings = initialState.settings,
  storageKey = "vite-ui-settings",
  ...props
}: SettingsProviderProps) {
  const [settings, setSettingsState] = useState<Settings>(() => ({
    ...defaultSettings,
    ...(JSON.parse(localStorage.getItem(storageKey) || "{}") as Settings),
  }));

  // Fetch feeds and categories on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        const [feeds, categories] = await Promise.all([
          fetchFeeds(),
          fetchCategories(),
        ]);

        setSettingsState((prev) => ({
          ...prev,
          feeds,
          categories,
        }));
      } catch (error) {
        console.error("Failed to initialize feeds and categories:", error);
        // Continue without data if fetch fails
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(THEMES.LIGHT, THEMES.DARK);

    if (settings.theme === THEMES.SYSTEM) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? THEMES.DARK
        : THEMES.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(settings.theme);
  }, [settings.theme]);

  const value = {
    settings,
    setSettings: (newSettings: Settings | ((prev: Settings) => Settings)) => {
      const resolvedSettings =
        typeof newSettings === "function"
          ? (newSettings as (prev: Settings) => Settings)(settings)
          : newSettings;
      localStorage.setItem(storageKey, JSON.stringify(resolvedSettings));
      setSettingsState(resolvedSettings);
    },
  };

  return (
    <SettingsProviderContext.Provider {...props} value={value}>
      {children}
    </SettingsProviderContext.Provider>
  );
}
