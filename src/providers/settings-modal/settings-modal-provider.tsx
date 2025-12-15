import { useState } from "react";
import { initialState, SettingsModalContext } from "./helpers";

import type { SettingsModalProviderProps } from "@/types/providers/settings-modal";

export function SettingsModalProvider({
  children,
  ...props
}: SettingsModalProviderProps) {
  const [open, setOpen] = useState(initialState.open);

  const value = {
    open,
    setOpen,
  };

  return (
    <SettingsModalContext.Provider {...props} value={value}>
      {children}
    </SettingsModalContext.Provider>
  );
}
