import { useKeyboardShortcuts } from "./shared/hooks/useKeyboardShortcuts";
import { useEffect } from "react";

import { useSettingsStore } from "./shared/store/settingsStore";
import AppRoutes from "./app/routes/AppRoutes";


export default function App() {
  const { theme } = useSettingsStore();
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);
  useKeyboardShortcuts()
  return <AppRoutes />;
}