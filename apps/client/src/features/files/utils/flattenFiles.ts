import type { FileSystemItem, FileType } from "@/features/files/types/file.types";
import { isFile, isFolder } from "@/features/files/utils/fileGuards";


export function flattenFiles(
  items: FileSystemItem[]
): FileType[] {

  let result: FileType[] =
    [];

  for (const item of items) {

    if (isFile(item)) {
      result.push(item);
    }

    if (isFolder(item)) {
      result = [
        ...result,

        ...flattenFiles(
          item.children
        ),
      ];
    }
  }

  return result;
}