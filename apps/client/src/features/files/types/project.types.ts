import type { FileSystemItem } from "./file.types"

export type ProjectType = {
    id: string
    name: string

    files: FileSystemItem[]

    createdAt: number

    updatedAt: number
}