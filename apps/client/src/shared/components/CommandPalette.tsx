import { Search } from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { useUIStore } from "../store/uiStore";

import { useEditorStore } from "@/features/editor/editorStore";

import { findFileById } from "@/features/editor/editorStore";

export default function CommandPalette() {
  const [query, setQuery] =
    useState("");

  const {
    commandPaletteOpen,
    closeCommandPalette,
  } = useUIStore();

  const {
    files,
    openTabs,
    setActiveFile,
  } = useEditorStore();

  const allFiles = useMemo(() => {
    return openTabs
      .map((id) =>
        findFileById(files, id)
      )
      .filter(Boolean);
  }, [files, openTabs]);

  const filteredFiles =
    allFiles.filter((file) =>
      file?.name
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    useEffect(() => {
      function handleEscape(e: KeyboardEvent) {
        if (e.key === "Escape") {
          closeCommandPalette();
        }
      }

      window.addEventListener("keydown", handleEscape);

      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }, []);

  if (!commandPaletteOpen)
    return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center pt-32">

      <div className="w-[600px] bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden">

        {/* SEARCH */}
        <div className="h-14 border-b border-[#30363d] flex items-center px-4 gap-3">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            autoFocus
            value={query}
            onChange={(e) =>
              setQuery(
                e.target.value
              )
            }
            placeholder="Search files..."
            className="
              flex-1 bg-transparent
              outline-none text-sm
              text-white
            "
          />
        </div>

        {/* RESULTS */}
        <div className="max-h-[400px] overflow-auto">

          {filteredFiles.map((file) => (
            <button
              key={file!.id}
              onClick={() => {
                setActiveFile(
                  file!.id
                );

                closeCommandPalette();
              }}
              className="
                w-full px-4 py-3
                text-left text-sm
                hover:bg-[#21262d]
                border-b border-[#21262d]
              "
            >
              {file!.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}