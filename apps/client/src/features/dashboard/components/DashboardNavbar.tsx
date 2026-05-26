// src/components/layout/Navbar.tsx

import {
  Bell,
  Search,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-[54px] border-b border-[#232323] bg-[#090909] flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="flex items-center gap-12">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-violet-200 bg-clip-text text-transparent">
          DevCanvas
        </h1>

        <div className="relative w-[620px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search projects..."
            className="
              w-full
              bg-[#0f0f10]
              border
              border-[#2a2a2a]
              rounded-xl
              h-9
              pl-11
              pr-4
              outline-none
              text-sm
              placeholder:text-zinc-500
              focus:border-purple-500
              transition
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        <button
          className="
            relative
            text-zinc-400
            hover:text-white
            transition
          "
        >
          <Bell size={21} />
        </button>

        <div
          className="
            h-9
            w-9
            rounded-full
            border
            border-[#2b2b2b]
            bg-gradient-to-br
            from-purple-500
            to-indigo-500
          "
        />
      </div>
    </header>
  );
};

export default Navbar;