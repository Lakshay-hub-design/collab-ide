export default function RightPanel() {
  return (
    <div className="h-full w-full border-l border-[#30363d] bg-[var(--sidebar)] flex flex-col">

      <div className="h-10 border-b border-[#30363d] flex items-center px-3 text-sm font-medium">
        COLLAB PANEL
      </div>

      <div className="flex-1 flex items-center justify-center text-gray-500">
        Future collaboration tools
      </div>
    </div>
  );
}