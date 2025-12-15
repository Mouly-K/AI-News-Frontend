// Separate file for helpers, types, etc to trigger React Refresh properly

import { createContext, useContext } from "react";
import {
  DEFAULT_FEEDS,
  THEMES,
  type SettingsProviderState,
} from "@/types/settings";

const initialState: SettingsProviderState = {
  settings: {
    theme: THEMES.SYSTEM,
    feeds: DEFAULT_FEEDS,
    categories: [],
  },
  setSettings: () => null,
};

const SettingsProviderContext =
  createContext<SettingsProviderState>(initialState);

function useSettings() {
  const context = useContext(SettingsProviderContext);

  if (context === undefined)
    throw new Error("useSettings must be used within a SettingsProvider");

  return context;
}

export { SettingsProviderContext, useSettings, initialState };
