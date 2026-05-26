import { findFileById, useEditorStore } from "@/features/editor/editorStore";
import { create } from "zustand";
import { runCode } from "../services/runCode";

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

  runCurrentFile: () => Promise<void>;
};



export const useTerminalStore =
  create<TerminalStore>((set,get) => ({
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

      runCurrentFile:
        async () => {

          const editorStore =
            useEditorStore.getState();

          const activeFile =
            findFileById(
              editorStore.files,

              editorStore.activeFileId
            );

          if (!activeFile)
            return;

          get().setIsRunning(
            true
          );

          get().addLine({
            id: crypto.randomUUID(),

            type: "command",

            text: `run ${activeFile.name}`,
          });

          try {

            const result =
              await runCode({
                code:
                  activeFile.content,

                language:
                  activeFile.language,
              });

            get().addLine({
              id: crypto.randomUUID(),

              type: "output",

              text:
                result.output,
            });

          } catch {

            get().addLine({
              id: crypto.randomUUID(),

              type: "error",

              text:
                "Execution failed",
            });

          } finally {

            get().setIsRunning(
              false
            );
          }
        },
  }));