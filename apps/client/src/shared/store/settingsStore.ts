import { create } from "zustand";

type Theme =
  | "dark"
  | "light";

type SettingsStore = {
  theme: Theme;

  fontSize: number;

  minimap: boolean;

  wordWrap: boolean;

  setTheme: (
    theme: Theme
  ) => void;

  setFontSize: (
    size: number
  ) => void;

  toggleMinimap: () => void;

  toggleWordWrap: () => void;
};

const savedSettings =
  localStorage.getItem(
    "ide-settings"
  );

const parsed =
  savedSettings
    ? JSON.parse(savedSettings)
    : null;

export const useSettingsStore =
  create<SettingsStore>(
    (set, get) => ({
      theme:
        parsed?.theme ||
        "dark",

      fontSize:
        parsed?.fontSize ||
        14,

      minimap:
        parsed?.minimap ??
        false,

      wordWrap:
        parsed?.wordWrap ??
        true,

      setTheme: (
        theme
      ) => {
        set({ theme });

        saveSettings(get());
      },

      setFontSize: (
        fontSize
      ) => {
        set({ fontSize });

        saveSettings(get());
      },

      toggleMinimap: () => {
        set((state) => ({
          minimap:
            !state.minimap,
        }));

        saveSettings(get());
      },

      toggleWordWrap: () => {
        set((state) => ({
          wordWrap:
            !state.wordWrap,
        }));

        saveSettings(get());
      },
    })
  );

function saveSettings(
  settings: SettingsStore
) {
  localStorage.setItem(
    "ide-settings",
    JSON.stringify({
      theme:
        settings.theme,

      fontSize:
        settings.fontSize,

      minimap:
        settings.minimap,

      wordWrap:
        settings.wordWrap,
    })
  );
}