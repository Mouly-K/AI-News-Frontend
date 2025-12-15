import { createContext, useContext } from "react";
import type { SettingsModalProviderState } from "@/types/providers/settings-modal";

const initialState: SettingsModalProviderState = {
  open: false,
  setOpen: () => null,
};

const SettingsModalContext =
  createContext<SettingsModalProviderState>(initialState);

function useSettingsModal() {
  const context = useContext(SettingsModalContext);

  if (context === undefined)
    throw new Error(
      "useSettingsModal must be used within a SettingsModalProvider",
    );

  return context;
}

export { SettingsModalContext, useSettingsModal, initialState };
