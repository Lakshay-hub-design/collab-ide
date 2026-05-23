import FileTree from "@/features/files/components/FileTree";

import { useEditorStore } from "@/features/editor/editorStore";

export default function ExplorerPanel() {
  const { files } = useEditorStore();

  return (
    <div className="h-full w-full bg-[#171C23] border-r border-[#30363d] flex flex-col">

      <div className="h-10 flex items-center px-3 text-sm font-medium border-b border-[#30363d]">
        EXPLORER
      </div>

      <div className="flex-1 overflow-auto p-2">
        <FileTree items={files} />
      </div>
    </div>
  );
}