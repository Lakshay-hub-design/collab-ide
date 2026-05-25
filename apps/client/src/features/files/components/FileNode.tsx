import { Trash2 } from "lucide-react";

import type { FileType } from "../types/file.types";

import { getFileIcon } from "../utils/getFileIcon";

type Props = {
  item: FileType;

  active: boolean;

  onClick: () => void;

  onDelete: () => void;

  onContextMenu: (
    e: React.MouseEvent
  ) => void;
};

export default function FileNode({
  item,
  active,
  onClick,
  onDelete,
  onContextMenu,
}: Props) {
  return (
    <div
      draggable
      onContextMenu={
        onContextMenu
      }
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "fileId",
          item.id
        );
      }}
      className={`
        group flex items-center justify-between
        px-2 py-1 rounded
        ${
          active
            ? "bg-[var(--hover)] border-l-2 border-l-blue-500"
            : "hover:bg-[var(--hover)]"
        }
      `}
    >
      <button
        onClick={onClick}
        className="
          flex items-center gap-2
          text-sm text-[var(--text)]    
          flex-1 text-left
        "
      >
        {getFileIcon({
          fileName: item.name,
        })}

        <span>{item.name}</span>
      </button>

      <button
        onClick={onDelete}
        className="
          opacity-0
          group-hover:opacity-100
          text-red-400
        "
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}