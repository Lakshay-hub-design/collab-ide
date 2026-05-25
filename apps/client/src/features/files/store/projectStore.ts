import { create } from "zustand";

import type { ProjectType } from "../types/project.types";

import { defaultProject } from "../data/defaultProject";

import {
  getProjects,
  saveProjects,
  saveActiveProjectId,
  getActiveProjectId,
} from "@/shared/utils/projectStorage";

type ProjectStore = {
  projects: ProjectType[];

  activeProjectId: string;

  setActiveProject: (id: string) => void;

  saveProject: (updatedProject: ProjectType) => void;

  createProject: (name: string) => void;

  deleteProject: (id: string) => void;
};

const savedProjects = getProjects();

const initialProjects =
  savedProjects.length > 0 ? savedProjects : [defaultProject];

const activeProject = getActiveProjectId() || initialProjects[0].id;

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: initialProjects,

  activeProjectId: activeProject,

  setActiveProject: (id) => {
    saveActiveProjectId(id);

    set({
      activeProjectId: id,
    });
  },

  saveProject: (updatedProject) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      );

      saveProjects(updatedProjects);

      return {
        projects: updatedProjects,
      };
    });
  },

  createProject: (name) => {
    const newProject: ProjectType = {
      id: crypto.randomUUID(),

      name,

      files: [],

      createdAt: Date.now(),

      updatedAt: Date.now(),
    };

    set((state) => {
      const updatedProjects = [newProject, ...state.projects];

      saveProjects(updatedProjects);

      return {
        projects: updatedProjects,
      };
    });
  },

  deleteProject: (id) => {
    set((state) => {
      const updated = state.projects.filter((project) => project.id !== id);

      saveProjects(updated);

      return {
        projects: updated,
      };
    });
  },
}));
