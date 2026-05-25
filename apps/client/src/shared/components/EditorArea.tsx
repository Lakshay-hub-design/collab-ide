import Editor from "@monaco-editor/react";

import { X } from "lucide-react";

import {
  useEditorStore,
  findFileById,
} from "@/features/editor/editorStore";

import { useSettingsStore } from "@/shared/store/settingsStore";

export default function EditorArea() {
  const {
    files,
    activeFileId,
    openTabs,
    setActiveFile,
    updateFileContent,
    closeTab,
  } = useEditorStore();

  const {
    theme,
    fontSize,
    minimap,
    wordWrap,
  } = useSettingsStore();

  // FIND ACTIV FILE
  const activeFile = findFileById(
    files,
    activeFileId
  );

  // GET OPENED TAB FILES
  const openedFiles = openTabs
    .map((id) => findFileById(files, id))
    .filter(Boolean);

  return (
    <div className="flex-1 h-full flex flex-col bg-[var(--sidebar)] overflow-hidden">

      {/* TABS */}
      <div className="h-10 border-b border-[#30363d]  flex items-center overflow-x-auto">

        {openedFiles.map((file) => (
          <button
            key={file!.id}
            onClick={() =>
              setActiveFile(file!.id)
            }
            className={`
                h-full px-4 flex items-center gap-3
                border-r border-[#30363d]
                text-sm min-w-fit
                relative
                transition-colors
                ${
                    activeFileId === file!.id
                    ? "bg-[#1e1e1e] text-white"
                    : "text-gray-400 hover:bg-[#21262d]"
                }
            `}
          >
            {activeFileId === file!.id && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500" />
            )}
            {file!.name}

            <span
              onClick={(e) => {
                e.stopPropagation();

                closeTab(file!.id);
              }}
              className="hover:bg-[#30363d] rounded p-0.5"
            >
              <X size={14} />
            </span>
          </button>
        ))}
      </div>

      {/* MONACO EDITOR */}
      <div className="flex-1 overflow-hidden">

        {activeFile && (
          <Editor
            height="100%"
            theme= {
              theme === "dark" ? "customTheme" : "light"
            }
            beforeMount={(monaco) => {
              monaco.editor.defineTheme("customTheme", {
                base: "vs-dark",
                inherit: true,
                rules: [],
                colors: {
                  "editor.background": "#0F141B",
                },
              })
            }}
            language={activeFile.language}
            value={activeFile.content}
            onChange={(value) =>
              updateFileContent(
                activeFile.id,
                value || ""
              )
            }
            options={{
              fontSize: fontSize,

              minimap: {
                enabled: minimap,
              },

              smoothScrolling: true,

              padding: {
                top: 16,
              },

              wordWrap: wordWrap ? "on" : "off",

              fontFamily:
                "'JetBrains Mono', monospace",

              cursorBlinking: "smooth",

              renderLineHighlight: "all",

              scrollBeyondLastLine: false,

              automaticLayout: true,
            }}
          />
        )}
      </div>
    </div>
  );
}