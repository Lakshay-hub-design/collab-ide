import { Bot, Users } from "lucide-react";

import { useWorkspaceStore } from "@/shared/store/workspaceStore";
import CollaborationPanel from "@/features/collaboration/components/CollaborationPanel";

export default function RightPanel() {
  const {
    activeRightPanel,

    setActiveRightPanel,
  } = useWorkspaceStore();

  return (
    <div
      className="
        h-full w-full
        border-l border-[var(--border)]
        bg-[var(--panel)]
        flex flex-col
      "
    >
      {/* HEADER */}
      <div
        className="
    h-12 px-2
    border-b border-[var(--border)]
    flex items-center gap-1
  "
      >
        <button
          onClick={() => setActiveRightPanel("ai")}
          className={`
      flex-1 h-9 rounded-lg
      flex items-center
      justify-center gap-2
      text-sm transition-colors
      ${
        activeRightPanel === "ai"
          ? "bg-violet-500 text-white"
          : "hover:bg-[var(--hover)]"
      }
    `}
        >
          <Bot size={16} />
          AI
        </button>

        <button
          onClick={() => setActiveRightPanel("collab")}
          className={`
      flex-1 h-9 rounded-lg
      flex items-center
      justify-center gap-2
      text-sm transition-colors
      ${
        activeRightPanel === "collab"
          ? "bg-violet-500 text-white"
          : "hover:bg-[var(--hover)]"
      }
    `}
        >
          <Users size={16} />
          Collab
        </button>

      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-hidden">
        {activeRightPanel === "ai" && (
          <div
            className="
              h-full p-5
            "
          >
            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                p-5
              "
            >
              <h2
                className="
                  text-xl font-semibold
                "
              >
                AI Assistant
              </h2>

              <p
                className="
                  mt-2 text-sm
                  text-[var(--text-secondary)]
                "
              >
                AI debugging, explanations, and code generation coming soon.
              </p>
            </div>
          </div>
        )}

        {activeRightPanel === "collab" && <CollaborationPanel />}

      </div>
    </div>
  );
}
