import {
  ArrowLeft,
  Check,
  Command,
  Play,
  Share2,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useProjectStore } from "@/features/files/store/projectStore";
import { findFileById, useEditorStore } from "@/features/editor/editorStore";
import { useTerminalStore } from "@/shared/store/terminalStore";
import { runCode } from "@/shared/services/runCode";
import { useUIStore } from "@/shared/store/uiStore";

export default function WorkspaceTopbar() {

  const navigate =
    useNavigate()

  const { openCommandPalette } =
  useUIStore();


  const {
    isRunning,
    runCurrentFile
} = useTerminalStore();



  const {
    projects,
    activeProjectId,
  } = useProjectStore();

  const project =
    projects.find(
      (project) =>
        project.id ===
        activeProjectId
    );

  return (
    <header
      className="
        h-14 px-4
        border-b border-[var(--border)]
        bg-[var(--panel)]
        flex items-center
        justify-between
      "
    >

      {/* LEFT */}
      <div
        className="
          flex items-center gap-4
          min-w-0
        "
      >

        {/* BACK */}
        <button
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
          className="
            h-9 w-9 rounded-lg
            hover:bg-[var(--hover)]
            flex items-center
            justify-center
            transition-colors
          "
        >
          <ArrowLeft size={18} />
        </button>

        {/* PROJECT */}
        <div
          className="
            flex items-center gap-3
            min-w-0
          "
        >

          <div
            className="
              h-9 w-9 rounded-xl
              bg-gradient-to-br
              from-violet-500
              to-purple-600
              flex items-center
              justify-center
              text-white font-bold
            "
          >
            {project?.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="min-w-0">

            <div
              className="
                flex items-center gap-2
              "
            >

              <h1
                className="
                  font-semibold
                  truncate max-w-[220px]
                "
              >
                {project?.name}
              </h1>

              <span
                className="
                  px-2 py-0.5 rounded-md
                  text-xs uppercase
                  bg-[var(--hover)]
                  text-[var(--text-secondary)]
                "
              >
                {project?.template}
              </span>

            </div>

            <div
              className="
                flex items-center gap-1
                text-xs
                text-emerald-400
              "
            >

              <Check size={12} />

              Saved

            </div>

          </div>

        </div>

      </div>

      {/* CENTER */}
      <div
        className="
          hidden md:flex
          items-center gap-2
        "
      >

        <button
        onClick={
    openCommandPalette
  }
          className="
            h-10 px-4 rounded-xl
            border border-[var(--border)]
            bg-[var(--bg)]
            hover:bg-[var(--hover)]
            flex items-center gap-2
          "
        >
          <Command size={16} />

          Command Palette
        </button>

      </div>

      {/* RIGHT */}
      <div
        className="
          flex items-center gap-3
        "
      >
        <button 
        onClick={runCurrentFile}
        className="h-8 px-3 bg-[#238636] rounded flex items-center gap-2 text-sm hover:bg-[#2ea043]">
          <Play size={16} />
          {isRunning ? "Runnig..." : "Run"}
        </button>

        {/* SHARE */}
        <button
          className="
            h-10 px-4 rounded-xl
            bg-[var(--hover)]
            hover:opacity-80
            flex items-center gap-2
          "
        >
          <Share2 size={16} />

          Share
        </button>

        {/* COLLAB */}
        <button
          className="
            h-10 px-4 rounded-xl
            bg-gradient-to-r
            from-violet-500
            to-purple-600
            text-white
            flex items-center gap-2
          "
        >
          <Users size={16} />

          Collaborate
        </button>

        {/* AVATAR */}
        <div
          className="
            h-10 w-10 rounded-full
            bg-gradient-to-br
            from-violet-500
            to-purple-600
          "
        />

      </div>

    </header>
  );
}