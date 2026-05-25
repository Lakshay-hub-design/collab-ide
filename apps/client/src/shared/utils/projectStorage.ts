import type { ProjectType } from "@/features/files/types/project.types";

import { STORAGE_KEYS } from "../constants/storage";

export function saveProjects(
  projects: ProjectType[]
) {
  localStorage.setItem(
    STORAGE_KEYS.PROJECTS,

    JSON.stringify(projects)
  );
}

export function getProjects(): ProjectType[] {
  const data =
    localStorage.getItem(
      STORAGE_KEYS.PROJECTS
    );

  if (!data) return [];

  return JSON.parse(data);
}

export function saveActiveProjectId(
  id: string
) {
  localStorage.setItem(
    STORAGE_KEYS.ACTIVE_PROJECT,
    id
  );
}

export function getActiveProjectId() {
  return localStorage.getItem(
    STORAGE_KEYS.ACTIVE_PROJECT
  );
}