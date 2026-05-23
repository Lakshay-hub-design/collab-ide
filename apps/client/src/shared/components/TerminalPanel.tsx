import {
  Terminal,
  Trash2,
  X,
} from "lucide-react";

import { useTerminalStore } from "@/shared/store/terminalStore";

export default function TerminalPanel() {
    const { output } = useTerminalStore();
  return (
    <div className="h-full bg-[#161b22] flex flex-col">

      {/* TERMINAL HEADER */}
      <div className="h-9 border-b border-[#30363d] flex items-center justify-between px-3">

        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Terminal size={16} />
          TERMINAL
        </div>

        <div className="flex items-center gap-2">

          <button className="text-gray-400 hover:text-white">
            <Trash2 size={14} />
          </button>

          <button className="text-gray-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* TERMINAL CONTENT */}
      <div className="flex-1 p-4 overflow-auto font-mono text-sm text-green-400 tracking-wide">

        <div
            className="
                flex-1 p-4 overflow-auto
                font-mono text-sm
                text-green-400
                whitespace-pre-wrap
            "
            >
            {output || "Ready for commands..."}
            </div>
      </div>
    </div>
  );
}