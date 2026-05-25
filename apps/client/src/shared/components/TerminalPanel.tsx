import {
  Trash2,
  Terminal,
} from "lucide-react";

import {
  KeyboardEvent,
  useEffect,
  useRef,
} from "react";

import { useTerminalStore } from "@/shared/store/terminalStore";

import { executeTerminalCommand } from "@/shared/utils/terminalCommands";

export default function TerminalPanel() {
  const {
    lines,
    currentCommand,
    setCurrentCommand,
    addLine,
    clearTerminal,
    history,
    historyIndex,
    setHistoryIndex,
    addHistory,
  } = useTerminalStore();

  const terminalRef =
    useRef<HTMLDivElement>(null);

  // AUTO SCROLL
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [lines]);

  async function handleCommand() {
    if (!currentCommand.trim())
      return;

    // ADD COMMAND LINE
    addLine({
      id: crypto.randomUUID(),

      type: "command",

      text: currentCommand,
    });

    addHistory(currentCommand);

    const result =
      await executeTerminalCommand({
        command:
          currentCommand,
      });

    // CLEAR TERMINAL
    if (result.type === "clear") {
      clearTerminal();

      setCurrentCommand("");

      return;
    }

    // OUTPUT
    addLine({
      id: crypto.randomUUID(),

      type:
        result.type as
          | "output"
          | "error",

      text:
        result.text || "",
    });

    setCurrentCommand("");
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLInputElement>
  ) {
    // ENTER
    if (e.key === "Enter") {
      handleCommand();
    }

    // ARROW UP
    if (e.key === "ArrowUp") {
      e.preventDefault();

      const nextIndex =
        Math.min(
          historyIndex + 1,
          history.length - 1
        );

      setHistoryIndex(nextIndex);

      if (history[nextIndex]) {
        setCurrentCommand(
          history[nextIndex]
        );
      }
    }

    // ARROW DOWN
    if (e.key === "ArrowDown") {
      e.preventDefault();

      const nextIndex =
        Math.max(
          historyIndex - 1,
          -1
        );

      setHistoryIndex(nextIndex);

      if (nextIndex === -1) {
        setCurrentCommand("");

        return;
      }

      setCurrentCommand(
        history[nextIndex]
      );
    }
  }

  return (
    <div className="h-full bg-[var(--panel)] flex flex-col">

      {/* HEADER */}
      <div className="h-9 border-b border-[#30363d] flex items-center justify-between px-3">

        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Terminal size={16} />
          TERMINAL
        </div>

        <button
          onClick={clearTerminal}
          className="text-gray-400 hover:text-white"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* TERMINAL BODY */}
      <div
        ref={terminalRef}
        className="
          flex-1 overflow-auto
          p-4 font-mono text-sm
          bg-[var(--terminal)]
        "
      >

        {/* OUTPUT LINES */}
        <div className="space-y-2">

          {lines.map((line) => (
            <div
              key={line.id}
              className={`
                whitespace-pre-wrap
                ${
                  line.type ===
                  "command"
                    ? "text-blue-400"
                    : ""

                } ${
                  line.type ===
                  "error"
                    ? "text-red-400"
                    : ""

                } ${
                  line.type ===
                  "output"
                    ? "text-green-400"
                    : ""

                } ${
                  line.type ===
                  "system"
                    ? "text-gray-400"
                    : ""
                }
              `}
            >
              {line.type ===
                "command" && (
                <span className="mr-2">
                  ❯
                </span>
              )}

              {line.text}
            </div>
          ))}

        </div>

        {/* INPUT */}
        <div className="flex items-center mt-4">

          <span className="text-blue-400 mr-2">
            ❯
          </span>

          <input
            autoFocus
            value={currentCommand}
            onChange={(e) =>
              setCurrentCommand(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="
              flex-1 bg-transparent 
              outline-none text-[var(--text)]
            "
          />
          
        </div>
      </div>
    </div>
  );
}