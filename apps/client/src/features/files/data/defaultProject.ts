import type { ProjectType } from "../types/project.types";

import { mockFiles } from "../mockFiles";

export const defaultProject: ProjectType =
  {
    id: crypto.randomUUID(),

    name: "My First Project",

    files: mockFiles,

    createdAt: Date.now(),

    updatedAt: Date.now(),
  };