import { useState } from "react";

type Props = {
  open: boolean;

  onClose: () => void;

  onCreate: (
    name: string
  ) => void;
};

export default function CreateProjectModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const [name, setName] =
    useState("");

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40
        flex items-center
        justify-center
      "
    >
      <div
        className="
          w-[400px]
          bg-[var(--panel)]
          border border-[var(--border)]
          rounded-xl p-5
        "
      >

        <h2
          className="
            text-lg font-semibold mb-4
          "
        >
          Create Project
        </h2>

        <input
          autoFocus
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Project name"
          className="
            w-full h-10 px-3
            rounded-md
            bg-[var(--bg)]
            border border-[var(--border)]
            outline-none
          "
        />

        <div
          className="
            flex justify-end gap-2
            mt-5
          "
        >
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-md
              bg-[var(--hover)]
            "
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!name.trim())
                return;

              onCreate(name);

              setName("");

              onClose();
            }}
            className="
              px-4 py-2 rounded-md
              bg-[var(--accent)]
              text-white
            "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}