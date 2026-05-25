import { X } from "lucide-react";

import { useSettingsStore } from "../store/settingsStore";

type Props = {
  open: boolean;

  onClose: () => void;
};

export default function SettingsModal({
  open,
  onClose,
}: Props) {
  const {
    theme,
    fontSize,
    minimap,
    wordWrap,

    setTheme,
    setFontSize,

    toggleMinimap,
    toggleWordWrap,
  } = useSettingsStore();

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
          w-[500px]
          bg-[#161b22]
          border border-[#30363d]
          rounded-xl shadow-2xl
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div
          className="
            h-14 border-b
            border-[#30363d]
            flex items-center
            justify-between px-4
          "
        >
          <span className="font-medium">
            Settings
          </span>

          <button
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-6">

          {/* THEME */}
          <div>
            <div className="text-sm mb-2">
              Theme
            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  setTheme(
                    "dark"
                  )
                }
                className={`
                  px-3 py-2 rounded
                  ${
                    theme ===
                    "dark"
                      ? "bg-blue-500"
                      : "bg-[#21262d]"
                  }
                `}
              >
                Dark
              </button>

              <button
                onClick={() =>
                  setTheme(
                    "light"
                  )
                }
                className={`
                  px-3 py-2 rounded
                  ${
                    theme ===
                    "light"
                      ? "bg-blue-500"
                      : "bg-[#21262d]"
                  }
                `}
              >
                Light
              </button>

            </div>
          </div>

          {/* FONT SIZE */}
          <div>
            <div className="text-sm mb-2">
              Font Size
            </div>

            <input
              type="range"
              min={12}
              max={24}
              value={fontSize}
              onChange={(e) =>
                setFontSize(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full"
            />

            <div className="text-sm mt-1 text-gray-400">
              {fontSize}px
            </div>
          </div>

          {/* MINIMAP */}
          <label
            className="
              flex items-center
              justify-between
            "
          >
            <span>
              Minimap
            </span>

            <input
              type="checkbox"
              checked={minimap}
              onChange={
                toggleMinimap
              }
            />
          </label>

          {/* WORD WRAP */}
          <label
            className="
              flex items-center
              justify-between
            "
          >
            <span>
              Word Wrap
            </span>

            <input
              type="checkbox"
              checked={wordWrap}
              onChange={
                toggleWordWrap
              }
            />
          </label>

        </div>
      </div>
    </div>
  );
}