// src/components/layout/Sidebar.tsx

import {
  Folder,
  LayoutDashboard,
  Plus,
  Share2,
  Trash2,
  FileText,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "My Projects",
    icon: Folder,
  },
  {
    label: "Shared with Me",
    icon: Share2,
  },
  {
    label: "Templates",
    icon: FileText,
  },
  {
    label: "Trash",
    icon: Trash2,
  },
];

type Props = {
  onCreateProject: () => void;
};

const Sidebar = ({onCreateProject}: Props) => {
  return (
    <aside
      className="
        w-[280px]
        border-r
        border-[#232323]
        bg-[#111111]
        flex
        flex-col
        justify-between
        px-4
        py-6
      "
    >
      <div>
        {/* WORKSPACE */}
        <div className="mb-8 px-2">
          <h2 className="text-xl font-semibold">
            Workspace
          </h2>

          <p className="text-sm text-zinc-400 mt-1">
            Collaborative Team
          </p>
        </div>

        {/* MENU */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`
                  w-full
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-xl
                  transition
                  border
                  ${
                    item.active
                      ? "bg-purple-600 border-purple-500"
                      : "bg-transparent border-transparent hover:bg-[#1a1a1a]"
                  }
                `}
              >
                <Icon size={19} />

                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* NEW PROJECT */}
      <button
        onClick={onCreateProject}
        className="
          h-11
          rounded-xl
          bg-gradient-to-r
          from-purple-600
          to-violet-500
          flex
          items-center
          justify-center
          gap-3
          font-medium
          hover:opacity-90
          transition
        "
      >
        <Plus size={18} />
        New Project
      </button>
    </aside>
  );
};

export default Sidebar;