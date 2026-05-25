import {
  FolderPlus,
  Plus,
} from "lucide-react";

type Props = {
  onCreateFile: () => void;

  onCreateFolder: () => void;
};

export default function ExplorerToolbar({
  onCreateFile,
  onCreateFolder,
}: Props) {
  return (
    <div
      className="
        h-10 flex items-center
        justify-between px-3
        border-b border-[#30363d]
      "
    >
      <span
        className="
          text-sm font-medium
          tracking-wide
        "
      >
        EXPLORER
      </span>

      <div className="flex items-center gap-2">

        <button
          onClick={onCreateFile}
          className="
            text-gray-400
            hover:text-white
            transition-colors
          "
        >
          <Plus size={16} />
        </button>

        <button
          onClick={onCreateFolder}
          className="
            text-gray-400
            hover:text-white
            transition-colors
          "
        >
          <FolderPlus size={16} />
        </button>

      </div>
    </div>
  );
}