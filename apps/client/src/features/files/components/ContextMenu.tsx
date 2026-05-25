type Props = {
  x: number;

  y: number;

  onRename: () => void;

  onDelete: () => void;
};

export default function ContextMenu({
  x,
  y,
  onRename,
  onDelete,
}: Props) {
  return (
    <div
      style={{
        top: y,
        left: x,
      }}
      className="
        fixed z-50
        bg-[var(--panel)]
        border border-[#30363d]
        rounded-md shadow-xl
        py-1 min-w-[140px]
      "
    >
      <button
        onClick={onRename}
        className="
          w-full px-3 py-2
          text-left text-sm
          text-[var(--text)]
          hover:bg-[var(--hover)]
        "
      >
        Rename
      </button>

      <button
        onClick={onDelete}
        className="
          w-full px-3 py-2
          text-left text-sm
          text-red-400
          hover:bg-[var(--hover)]
        "
      >
        Delete
      </button>
    </div>
  );
}