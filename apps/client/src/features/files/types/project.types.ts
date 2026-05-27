import type { FileSystemItem } from "./file.types"

export type ProjectTemplate =
  | "react"
  | "node"
  | "python"
  | "blank";

export type ProjectVisibility =
  | "private"
  | "public";

export type ProjectType = {
    id: string
    name: string

    template: ProjectTemplate;

    visibility: ProjectVisibility;

    files: FileSystemItem[]

    createdAt: number

    updatedAt: number
}