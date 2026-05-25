import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderPlus,
  Plus,
} from "lucide-react";

import type { FolderType } from "../types/file.types";

type Props = {
  item: FolderType;

  isOpen: boolean;

  onToggle: () => void;

  onCreateFile: () => void;

  onCreateFolder: () => void;

  onContextMenu: (
    e: React.MouseEvent
  ) => void;

  children: React.ReactNode;
};

export default function FolderNode({
  item,
  isOpen,
  onToggle,
  onCreateFile,
  onCreateFolder,
  onContextMenu,
  children,
}: Props) {
  return (
    <div>

      <div
        onContextMenu={
          onContextMenu
        }
        className="
          group flex items-center
          justify-between px-2 py-1
          rounded hover:bg-[var(--hover)]
        "
      >

        <button
          onClick={onToggle}
          className="
            flex items-center gap-1
            text-[var(--text)]
          "
        >
          {isOpen ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}

          <Folder size={16} />

          <span>{item.name}</span>
        </button>

        <div className="flex items-center gap-1">

          <button
            onClick={onCreateFile}
            className="
              opacity-0
              group-hover:opacity-100
            "
          >
            <Plus size={14} />
          </button>

          <button
            onClick={onCreateFolder}
            className="
              opacity-0
              group-hover:opacity-100
            "
          >
            <FolderPlus size={14} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            ml-4 border-l
            border-[#30363d]
            pl-2
          "
        >
          {children}
        </div>
      )}
    </div>
  );
}