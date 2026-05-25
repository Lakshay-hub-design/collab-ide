import type {
  FileSystemItem,
  FileType,
  FolderType,
} from "../types/file.types";

export function isFolder(
  item: FileSystemItem
): item is FolderType {
  return "children" in item;
}

export function isFile(
  item: FileSystemItem
): item is FileType {
  return "content" in item;
}