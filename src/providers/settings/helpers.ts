// Separate file for helpers, types, etc to trigger React Refresh properly

import { createContext, useContext } from "react";
import { THEMES } from "@/types/settings";
import type { SettingsProviderState } from "@/types/providers/settings";

const initialState: SettingsProviderState = {
  settings: {
    theme: THEMES.SYSTEM,
    feeds: [],
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
