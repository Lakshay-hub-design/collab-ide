import { useState } from "react";

import CreateProjectModal from "@/features/dashboard/components/CreateProjectModel";

import { useProjectStore } from "@/features/files/store/projectStore";

import DashboardNavbar from "@/features/dashboard/components/DashboardNavbar";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import ProjectsGrid from "@/features/dashboard/components/ProjectsGrid";

export default function DashboardPage() {

  const [open, setOpen] = useState(false);

  const { createProject } = useProjectStore();
  return (

    <div className="h-screen bg-black text-white overflow-hidden">
      <DashboardNavbar />

      <div className="flex h-[calc(100vh-54px)]">
        <DashboardSidebar
          onCreateProject={() => setOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <ProjectsGrid />
        </main>
        <CreateProjectModal
  open={open}
  onClose={() =>
    setOpen(false)
  }
  onCreate={(
    name,
    template,
    visibility
  ) =>
    createProject(
      name,
      template,
      visibility
    )
  }
/>
      </div>
    </div>
  );
}