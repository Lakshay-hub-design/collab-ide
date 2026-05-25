import { create } from "zustand";

type UIStore = {
  explorerOpen: boolean;

  terminalOpen: boolean;

  commandPaletteOpen: boolean;

  toggleExplorer: () => void;

  toggleTerminal: () => void;

  openCommandPalette: () => void;

  closeCommandPalette: () => void;
};

export const useUIStore =
  create<UIStore>((set) => ({
    explorerOpen: true,

    terminalOpen: true,

    commandPaletteOpen: false,

    toggleExplorer: () =>
      set((state) => ({
        explorerOpen:
          !state.explorerOpen,
      })),

    toggleTerminal: () =>
      set((state) => ({
        terminalOpen:
          !state.terminalOpen,
      })),

    openCommandPalette: () =>
      set({
        commandPaletteOpen: true,
      }),

    closeCommandPalette: () =>
      set({
        commandPaletteOpen: false,
      }),
  }));