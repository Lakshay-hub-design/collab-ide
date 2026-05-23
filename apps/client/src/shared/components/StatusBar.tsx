export default function StatusBar() {
  return (
    <div className="h-6 bg-[#1f6feb] flex items-center justify-between px-3 text-xs text-white shadow-[0_-1px_0_#30363d]">

      <div className="flex items-center gap-4">
        <span>main</span>
        <span>TypeScript React</span>
      </div>

      <div className="flex items-center gap-4">
        <span>UTF-8</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}