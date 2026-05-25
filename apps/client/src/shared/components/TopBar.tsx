import { findFileById, useEditorStore } from "@/features/editor/editorStore";
import { Play, Bug, Share2, Settings } from "lucide-react";
import { useTerminalStore } from "../store/terminalStore";
import { runCode } from "../services/runCode";


export default function TopBar() {

  const { files, activeFileId } = useEditorStore();

  const activeFile = findFileById(
    files,
    activeFileId
  );

  const {
    addLine,
    setIsRunning,
    isRunning,
} = useTerminalStore();

async function handleRunCode() {
  if (!activeFile) return;

  try {
    setIsRunning(true);

    addLine({
      id: crypto.randomUUID(),

      type: "command",

      text: `run ${activeFile.name}`,
    });

    const result = await runCode({
      code: activeFile.content,

      language: activeFile.language,
    });

    addLine({
      id: crypto.randomUUID(),

      type: "output",

      text: result.output,
    });

  } catch (error) {
    console.log(error);

    addLine({
      id: crypto.randomUUID(),

      type: "error",

      text: "Execution failed",
    });

  } finally {
    setIsRunning(false);
  }
}

  return (
    <div className="h-12 border-b border-[#30363d] bg-[var(--panel)] flex items-center justify-between px-4">

      {/* LEFT */}
      <div className="flex items-center gap-8">
        <h1 className="text-sm font-semibold tracking-wide">
          DevStudio IDE
        </h1>

        <div className="flex items-center gap-5 text-sm text-gray-300">
          <button className="hover:text-white text-gray-400 transition-colors">File</button>
          <button className="hover:text-white text-gray-400 transition-colors">Edit</button>
          <button className="hover:text-white text-gray-400 transition-colors">Selection</button>
          <button className="hover:text-white text-gray-400 transition-colors">View</button>
          <button className="hover:text-white text-gray-400 transition-colors">Go</button>
          <button className="hover:text-white text-gray-400 transition-colors">Run</button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        <button 
        onClick={handleRunCode}
        className="h-8 px-3 bg-[#238636] rounded flex items-center gap-2 text-sm hover:bg-[#2ea043]">
          <Play size={16} />
          {isRunning ? "Runnig..." : "Run"}
        </button>

        <button className="h-8 px-3 bg-[#1f6feb] rounded flex items-center gap-2 text-sm hover:bg-[#388bfd]">
          <Share2 size={16} />
          Share
        </button>

        <button className="w-8 h-8 flex items-center justify-center hover:bg-[#21262d] rounded">
          <Bug size={18} />
        </button>

        <button className="w-8 h-8 flex items-center justify-center hover:bg-[#21262d] rounded">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
}