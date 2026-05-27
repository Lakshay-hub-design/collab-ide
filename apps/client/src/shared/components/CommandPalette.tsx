import {
  Command,
  FileCode2,
  Moon,
  Play,
  Search,
  Settings,
  Sun,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { useUIStore } from "../store/uiStore";

import { useEditorStore } from "@/features/editor/editorStore";

import { flattenFiles } from "@/features/files/utils/flattenFiles";

import { useSettingsStore } from "@/shared/store/settingsStore";

import { useWorkspaceStore } from "@/shared/store/workspaceStore";
import { useTerminalStore } from "../store/terminalStore";

type CommandItem = {
  id: string;

  title: string;

  description?: string;

  icon: React.ElementType;

  type: "file" | "command";

  action: () => void;
};

export default function CommandPalette() {
  const [query, setQuery] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { commandPaletteOpen, closeCommandPalette } = useUIStore();

  const { files, setActiveFile } = useEditorStore();

  const { setOpenSettings } = useWorkspaceStore();

  const { theme, setTheme } = useSettingsStore();

  const allFiles = flattenFiles(files);

  const { runCurrentFile } = useTerminalStore();

  const commands: CommandItem[] = [
    {
      id: "settings",

      title: "Open Settings",

      description: "Configure IDE preferences",

      icon: Settings,

      type: "command",

      action: () => {
        setOpenSettings(true);
      },
    },

    {
      id: "theme",

      title:
        theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme",

      description: "Toggle IDE appearance",

      icon: theme === "dark" ? Sun : Moon,

      type: "command",

      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
      },
    },

    {
      id: "run",

      title: "Run Project",

      description: "Execute current workspace",

      icon: Play,

      type: "command",

      action: () => {
        runCurrentFile();
      },
    },
  ];

  const fileItems: CommandItem[] = allFiles.map((file) => ({
    id: file.id,

    title: file.name,

    description: "Open file",

    icon: FileCode2,

    type: "file",

    action: () => {
      setActiveFile(file.id);
    },
  }));

  const items = useMemo(() => {
    const all = [...commands, ...fileItems];

    return all.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, files, theme]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedIndex(-1);

        setQuery("");
        closeCommandPalette();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setSelectedIndex((prev) => {
          if (prev === -1) {
            return 0;
          }

          return Math.min(prev + 1, items.length - 1);
        });
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        setSelectedIndex((prev) => {
          // nothing selected yet
          if (prev === -1) {
            return items.length - 1;
          }

          // move upward
          return Math.max(prev - 1, -1);
        });
      }

      if (e.key === "Enter") {
        if (selectedIndex >= 0) {
          items[selectedIndex]?.action();
          setSelectedIndex(-1);
          setQuery("");
          closeCommandPalette();
        }
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [items, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  if (!commandPaletteOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/50
        backdrop-blur-sm
        flex justify-center
        pt-24
      "
    >
      <div
        className="
          w-[700px]
          rounded-3xl
          border border-[var(--border)]
          bg-[var(--panel)]
          shadow-2xl
          overflow-hidden
        "
      >
        {/* SEARCH */}
        <div
          className="
            h-16 px-5
            border-b border-[var(--border)]
            flex items-center gap-4
          "
        >
          <Search
            size={20}
            className="
              text-[var(--text-secondary)]
            "
          />

          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files and commands..."
            className="
              flex-1 bg-transparent
              outline-none text-lg
            "
          />

          <div
            className="
              flex items-center gap-1
              px-2 py-1 rounded-md
              bg-[var(--hover)]
              text-xs
            "
          >
            <Command size={12} />K
          </div>
        </div>

        {/* RESULTS */}
        <div
          className="
            max-h-[500px]
            overflow-auto
            p-2
          "
        >
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  item.action();

                  closeCommandPalette();
                }}
                className={`
                    w-full rounded-2xl
                    px-4 py-3
                    flex items-center gap-4
                    transition-colors
                    ${
                      selectedIndex === index
                        ? "bg-violet-500/20"
                        : "hover:bg-[var(--hover)]"
                    }
                  `}
              >
                <div
                  className="
                      h-10 w-10 rounded-xl
                      bg-[var(--hover)]
                      flex items-center
                      justify-center
                    "
                >
                  <Icon size={18} />
                </div>

                <div className="text-left">
                  <div
                    className="
                        font-medium
                      "
                  >
                    {item.title}
                  </div>

                  <div
                    className="
                        text-sm
                        text-[var(--text-secondary)]
                      "
                  >
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
