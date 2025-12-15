type SettingsModalProviderState = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type SettingsModalProviderProps = {
  children: React.ReactNode;
};

export type { SettingsModalProviderState, SettingsModalProviderProps };
