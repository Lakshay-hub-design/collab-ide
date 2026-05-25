import { useState } from "react";

import {
  FolderPlus,
  Plus,
} from "lucide-react";

import FileTree from "@/features/files/components/FileTree";

import { useEditorStore } from "@/features/editor/editorStore";

import { useProjectStore } from "@/features/files/store/projectStore";

import RecentProjects from "./RecentProjects";

export default function ExplorerPanel() {

  const {
    projects,
    activeProjectId,
  } = useProjectStore();

  const {
    files,
    createFile,
    createFolder,
  } = useEditorStore();

  const activeProject =
    projects.find(
      (project) =>
        project.id ===
        activeProjectId
    );

  const [
    creatingRoot,
    setCreatingRoot,
  ] = useState<
    "file" | "folder" | null
  >(null);

  const [
    rootName,
    setRootName,
  ] = useState("");

  return (
    <div
      className="
        h-full w-full
        bg-[var(--sidebar)]
        border-r border-[var(--border)]
        flex flex-col
      "
    >

      {/* HEADER */}
      <div
        className="
          min-h-12 px-3 py-2
          flex items-center
          justify-between
          border-b border-[var(--border)]
        "
      >

        <div className="flex flex-col">

          <span
            className="
              text-xs uppercase
              tracking-wider
              text-[var(--text-secondary)]
            "
          >
            Explorer
          </span>

          <span
            className="
              text-sm font-semibold
              truncate max-w-[180px]
              text-[var(--text)]
            "
          >
            {activeProject?.name ||
              "Workspace"}
          </span>

        </div>

        <div className="flex items-center gap-2">

          {/* CREATE FILE */}
          <button
            onClick={() => {
              setCreatingRoot(
                "file"
              );

              setRootName("");
            }}
            className="
              text-[var(--text-secondary)]
              hover:text-[var(--text)]
              transition-colors
            "
          >
            <Plus size={16} />
          </button>

          {/* CREATE FOLDER */}
          <button
            onClick={() => {
              setCreatingRoot(
                "folder"
              );

              setRootName("");
            }}
            className="
              text-[var(--text-secondary)]
              hover:text-[var(--text)]
              transition-colors
            "
          >
            <FolderPlus size={16} />
          </button>

        </div>
      </div>

      {/* ROOT CREATE INPUT */}
      {creatingRoot && (
        <div
          className="
            p-2 border-b
            border-[var(--border)]
          "
        >

          <input
            autoFocus
            value={rootName}
            onChange={(e) =>
              setRootName(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                rootName.trim()
              ) {

                if (
                  creatingRoot ===
                  "file"
                ) {
                  createFile(
                    null,
                    rootName
                  );
                }

                if (
                  creatingRoot ===
                  "folder"
                ) {
                  createFolder(
                    null,
                    rootName
                  );
                }

                setCreatingRoot(
                  null
                );

                setRootName("");
              }

              if (
                e.key === "Escape"
              ) {
                setCreatingRoot(
                  null
                );
              }
            }}
            placeholder={
              creatingRoot ===
              "file"
                ? "filename.ts"
                : "folder name"
            }
            className="
              w-full h-9 px-2
              rounded-md text-sm
              bg-[var(--bg)]
              border border-[var(--border)]
              text-[var(--text)]
              outline-none
            "
          />

        </div>
      )}

      {/* FILE TREE */}
      <div className="flex-1 overflow-auto p-2">
        <FileTree items={files} />
      </div>

      {/* RECENT PROJECTS */}
      <div
        className="
          border-t border-[var(--border)]
          mt-4 pt-4
        "
      >
        <RecentProjects />
      </div>

    </div>
  );
}