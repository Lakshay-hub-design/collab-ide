import { useProjectStore } from "@/features/files/store/projectStore";
import { useEditorStore } from "@/features/editor/editorStore";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateProjectModal from "@/features/files/components/CreateProjectModal";

export default function RecentProjects() {
  const {
    projects,
    activeProjectId,
    setActiveProject,
    createProject
  } = useProjectStore();

  const { loadProjectFiles } =
  useEditorStore();

const [open, setOpen] =
  useState(false);
  return (
    <div className="flex flex-col gap-2 p-2">

      <div className="text-xs text-gray-400 uppercase tracking-wider">
        Recent Projects
      </div>

      <button
  onClick={() =>
    setOpen(true)
  }
  className="
    flex items-center gap-2
    text-sm px-2 py-1 rounded
    hover:bg-[var(--hover)]
  "
>
  <Plus size={14} />

  New Project
</button>

      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => {
            setActiveProject(
              project.id
            );

            loadProjectFiles(
              project.files
            );
          }}
          className={`
            p-2 rounded text-left
            transition-colors
            ${
              activeProjectId ===
              project.id
                ? "bg-[#1f2937]"
                : "hover:bg-[#161b22]"
            }
          `}
        >
          <div className="text-sm text-white">
            {project.name}
          </div>

          <div className="text-xs text-gray-400 mt-1">
            {new Date(
              project.updatedAt
            ).toLocaleString()}
          </div>
        </button>
      ))}

      <CreateProjectModal
  open={open}
  onClose={() =>
    setOpen(false)
  }
  onCreate={(name) =>
    createProject(name)
  }
/>
    </div>
  );
}