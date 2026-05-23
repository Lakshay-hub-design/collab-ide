import { Files, Search, GitBranch, PlaySquare, Blocks } from "lucide-react";

export default function ActivityBar() {
  return (
    <div className="w-14 bg-[#171C23] border-r border-[#30363d] flex flex-col items-center py-3 gap-2">
      <button
        className="
        relative
        w-full h-10
        flex items-center justify-center
        text-blue-400
      "
      >
        <div className="absolute left-0 w-[2px] h-6 bg-blue-500" />

        <Files size={24} />
      </button>

      <button
        className="
          w-full h-12
          flex items-center justify-center
          text-gray-500
          hover:text-white
          transition-colors
        "
      >
        <Search size={24} />
      </button>

      <button
        className="
          w-full h-12
          flex items-center justify-center
          text-gray-500
          hover:text-white
          transition-colors
        "
      >
        <GitBranch size={24} />
      </button>

      <button
        className="
        w-full h-12
        flex items-center justify-center
        text-gray-500
        hover:text-white
        transition-colors
      "
      >
        <PlaySquare size={24} />
      </button>

      <button
        className="
        w-full h-12
        flex items-center justify-center
        text-gray-500
        hover:text-white
        transition-colors
      "
      >
        <Blocks size={24} />
      </button>
    </div>
  );
}
