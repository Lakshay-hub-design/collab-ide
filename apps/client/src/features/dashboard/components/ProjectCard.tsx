import {
  MoreVertical,
  LayoutDashboard,
  Shield,
  Palette,
  Server,
  Globe,
  FileCode2,
  Users,
} from "lucide-react";

import type { ProjectType } from "@/features/files/types/project.types";

type Props = {
  project: ProjectType;
  onClick: () => void;
};

const templateStyles = {
  react: {
    gradient: "from-violet-500/20 to-fuchsia-500/10",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-300",
  },

  node: {
    gradient: "from-emerald-500/20 to-green-500/10",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-300",
  },

  python: {
    gradient: "from-yellow-500/20 to-orange-500/10",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-300",
  },

  blank: {
    gradient: "from-zinc-500/20 to-zinc-700/10",
    iconBg: "bg-zinc-500/15",
    iconColor: "text-zinc-300",
  },
};

function getProjectIcon(projectName: string) {
  const name = projectName.toLowerCase();

  if (name.includes("dashboard")) {
    return LayoutDashboard;
  }

  if (name.includes("auth")) {
    return Shield;
  }

  if (name.includes("design")) {
    return Palette;
  }

  if (name.includes("api")) {
    return Server;
  }

  if (name.includes("web")) {
    return Globe;
  }

  return FileCode2;
}

export default function ProjectCard({ project, onClick }: Props) {
  const style =
    templateStyles[
      project.template?.toLowerCase() as keyof typeof templateStyles
    ] || templateStyles.blank;

  const Icon = getProjectIcon(project.name);

  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border border-[#252525]
        bg-[#151515]
        p-6
        text-left
        transition-all
        duration-300
        hover:border-violet-500/40
        hover:bg-[#181818]
        hover:-translate-y-1
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className={`
          absolute inset-0
          opacity-40
          bg-gradient-to-br
          ${style.gradient}
        `}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* TOP */}
        <div className="flex items-start justify-between">
          <div
            className={`
              h-10 w-10
              rounded-2xl
              flex items-center
              justify-center
              border border-white/5
              ${style.iconBg}
            `}
          >
            <Icon size={18} className={style.iconColor} />
          </div>

          <div className="flex items-center gap-4">
            {/* STATUS DOT */}
            <div
              className="
                h-2.5 w-2.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_10px_rgba(16,185,129,0.9)]
              "
            />

            <button
              className="
                text-zinc-500
                transition
                hover:text-white
              "
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* TITLE */}
        <div className="mt-3">
          <h2
            className="
              text-[28px]
              font-semibold
              tracking-[-0.02em]
              text-white
            "
          >
            {project.name}
          </h2>

          {/* TAGS */}
          <div
            className="
              mt-4
              flex items-center
              gap-2
            "
          >
            <span
              className="
                rounded-md
                border border-white/5
                bg-[#2A2A2A]
                px-2 py-1
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-zinc-300
              "
            >
              {project.template}
            </span>

            <span
              className="
                rounded-md
                border border-white/5
                bg-[#2A2A2A]
                px-2 py-1
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-zinc-300
              "
            >
              {project.visibility}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-8
            flex items-end
            justify-between
          "
        >
          {/* USERS */}
          <div
            className="
              flex items-center
            "
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((user) => (
                <div
                  key={user}
                  className="
                      h-8 w-8
                      rounded-full
                      border-2 border-[#151515]
                      bg-gradient-to-br
                      from-violet-500
                      to-purple-700
                    "
                />
              ))}
            </div>

            <div
              className="
                ml-2
                flex h-8 w-8
                items-center
                justify-center
                rounded-full
                bg-[#2C2C2C]
                text-xs
                font-medium
                text-zinc-300
              "
            >
              +2
            </div>
          </div>

          {/* LAST EDITED */}
          <div
            className="
              flex items-center
              gap-2
              text-sm
              text-zinc-400
            "
          >
            <Users size={14} />

            <span>Edited 2h ago</span>
          </div>
        </div>
      </div>
    </button>
  );
}
