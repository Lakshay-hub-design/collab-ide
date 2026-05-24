import { create } from "zustand";

type TerminalLine = {
  id: string;

  type:
    | "command"
    | "output"
    | "error"
    | "system";

  text: string;
};

type TerminalStore = {
  lines: TerminalLine[];

  currentCommand: string;

  history: string[];

  historyIndex: number;

  isRunning: boolean;

  setCurrentCommand: (
    value: string
  ) => void;

  addLine: (
    line: TerminalLine
  ) => void;

  clearTerminal: () => void;

  addHistory: (
    command: string
  ) => void;

  setHistoryIndex: (
    index: number
  ) => void;

  setIsRunning: (
    value: boolean
  ) => void;
};

export const useTerminalStore =
  create<TerminalStore>((set) => ({
    lines: [
      {
        id: crypto.randomUUID(),

        type: "system",

        text: "DevStudio Terminal Ready",
      },
    ],

    currentCommand: "",

    history: [],

    historyIndex: -1,

    isRunning: false,

    setCurrentCommand: (
      value
    ) =>
      set({
        currentCommand: value,
      }),

    addLine: (line) =>
      set((state) => ({
        lines: [
          ...state.lines,
          line,
        ],
      })),

    clearTerminal: () =>
      set({
        lines: [],
      }),

    addHistory: (command) =>
      set((state) => ({
        history: [
          command,
          ...state.history,
        ],

        historyIndex: -1,
      })),

    setHistoryIndex: (
      index
    ) =>
      set({
        historyIndex: index,
      }),

    setIsRunning: (value) =>
      set({
        isRunning: value,
      }),
  }));