import type { Settings } from "@/types/settings";

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings?: Settings;
  storageKey?: string;
};

type SettingsProviderState = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

export type { SettingsProviderProps, SettingsProviderState };
