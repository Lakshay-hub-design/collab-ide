import { useNavigate } from "react-router-dom";

import { useProjectStore } from "@/features/files/store/projectStore";

import ProjectCard from "./ProjectCard";

import {
  Grid2X2,
  List,
} from "lucide-react";

const ProjectGrid = () => {
  
  const navigate = useNavigate()
    const {
    projects,
    setActiveProject,
  } = useProjectStore();

  return (
    <section>
      {/* TOP */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Projects
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage and access your workspace repositories.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="
              h-12
              px-6
              rounded-xl
              border
              border-[#313131]
              bg-[#181818]
              hover:bg-[#202020]
              transition
            "
          >
            Open Terminal
          </button>

          <button
            className="
              h-12
              px-7
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-violet-500
              font-semibold
            "
          >
            New Project
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="mt-5 flex items-center justify-between border-b border-[#222] pb-2">
        <div className="flex items-center gap-10">
          {["All", "Recent", "Owned", "Shared"].map(
            (item, index) => (
              <button
                key={item}
                className={`
                  text-sm
                  font-medium
                  pb-2
                  transition
                  ${
                    index === 0
                      ? "text-white border-b border-purple-500"
                      : "text-zinc-500 hover:text-white"
                  }
                `}
              >
                {item}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-5">
          <p className="text-sm text-zinc-400">
            Sort by:
            <span className="text-white ml-2">
              Last Edited
            </span>
          </p>

          <div className="flex items-center gap-2 border border-[#2d2d2d] rounded-xl p-2">
            <button className="bg-[#222] p-2 rounded-lg">
              <Grid2X2 size={18} />
            </button>

            <button className="p-2 rounded-lg text-zinc-500">
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {projects.map(
          (project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => {

                setActiveProject(
                  project.id
                );

                navigate(
                  `/editor/${project.id}`
                );
              }}
            />
          )
        )}
      </div>

    </section>
  );
};

export default ProjectGrid;