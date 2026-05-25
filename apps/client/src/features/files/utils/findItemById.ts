import type {
  FileSystemItem,
} from "../types/file.types";

import {
  isFolder,
} from "./fileGuards";

export function findItemById(
  items: FileSystemItem[],
  id: string
): FileSystemItem | null {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }

    if (isFolder(item)) {
      const found =
        findItemById(
          item.children,
          id
        );

      if (found) {
        return found;
      }
    }
  }

  return null;
}