import ActivityBar from "../components/ActivityBar";
import ExplorerPanel from "../components/ExplorerPanel";
import EditorArea from "../components/EditorArea";
import RightPanel from "../components/RightPanel";
import StatusBar from "../components/StatusBar";
import TerminalPanel from "../components/TerminalPanel";
import WorkspaceTopbar from "@/features/workspace/components/WorkspaceTopbar";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { useUIStore } from "../store/uiStore";
import CommandPalette from "../components/CommandPalette";

export default function EditorLayout() {
  const {
    explorerOpen,
    terminalOpen,
  } = useUIStore();
  return (
    <div className="h-screen w-screen overflow-hidden bg-[--bg)] text-white flex flex-col">

      {/* TOPBAR */}
      <WorkspaceTopbar />

      {/* MAIN */}
      <div className="flex-1 overflow-hidden flex">

        {/* ACTIVITY BAR */}
        <ActivityBar />

        {/* RESIZABLE CONTENT */}
        <PanelGroup
          direction="horizontal"
          className="flex-1"
        >

          {explorerOpen && (
            <>
              <Panel
                defaultSize={18}
                minSize={12}
                maxSize={30}
              >
                <ExplorerPanel />
              </Panel>

              <PanelResizeHandle className="w-[2px] bg-[#30363d] hover:bg-blue-500 transition-colors" />
            </>
          )}

          {/* CENTER */}
          <Panel defaultSize={64}>

            <PanelGroup direction="vertical">

              {/* EDITOR */}
              <Panel
                defaultSize={75}
                minSize={40}
              >
                <EditorArea />
              </Panel>

              {terminalOpen && (
                <>
                  <PanelResizeHandle className="h-[2px] bg-[#30363d] hover:bg-blue-500 transition-colors" />

                  <Panel
                    defaultSize={25}
                    minSize={15}
                    maxSize={50}
                  >
                    <TerminalPanel />
                  </Panel>
                </>
              )}

            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-[2px] bg-[#30363d] hover:bg-blue-500 transition-colors" />

          {/* RIGHT PANEL */}
          <Panel
            defaultSize={18}
            minSize={12}
            maxSize={30}
          >
            <RightPanel />
          </Panel>

        </PanelGroup>
      </div>
      
      <CommandPalette />
      {/* STATUSBAR */}
      <StatusBar />
    </div>
  );
}