import { useKeyboardShortcuts } from "./shared/hooks/useKeyboardShortcuts";
import EditorLayout from "./shared/layouts/EditorLayout";
import { useEffect } from "react";

import { useSettingsStore } from "./shared/store/settingsStore";

export default function App() {
  const { theme } = useSettingsStore();
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);
  useKeyboardShortcuts()
  return <EditorLayout />;
}