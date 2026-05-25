import { useEffect } from "react";

import { useUIStore } from "../store/uiStore";

import { useEditorStore } from "@/features/editor/editorStore";

export function useKeyboardShortcuts() {
  const {
    toggleExplorer,
    toggleTerminal,
    openCommandPalette,
  } = useUIStore();

  const {
    activeFileId,
    closeTab,
  } = useEditorStore();

  useEffect(() => {
    function handleKeyDown(
      e: KeyboardEvent
    ) {
      // CTRL/CMD + B
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "b"
      ) {
        e.preventDefault();

        toggleExplorer();
      }

      // CTRL/CMD + J
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "j"
      ) {
        e.preventDefault();

        toggleTerminal();
      }

      // CTRL/CMD + P
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "p"
      ) {
        e.preventDefault();

        openCommandPalette();
      }

      // CTRL/CMD + W
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "w"
      ) {
        e.preventDefault();

        if (activeFileId) {
          closeTab(activeFileId);
        }
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);
}