// Separate file for helpers, types, etc to trigger React Refresh properly

import { createContext, useContext } from "react";

import { type Settings } from "@/types/settings";

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings?: Settings;
  storageKey?: string;
};

type SettingsProviderState = {
  settings: Settings;
  setSettings: (callback: (oldSettings: Settings) => Settings) => void;
};

const initialState: SettingsProviderState = {
  settings: {
    theme: "system",
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

export type { SettingsProviderProps, SettingsProviderState };
export { SettingsProviderContext, useSettings, initialState };
