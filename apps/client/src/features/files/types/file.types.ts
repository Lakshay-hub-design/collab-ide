export type BaseItem = {
  id: string;

  name: string;
};

export type FileType = BaseItem & {
  type: "file"
  language: string;
  content: string;
};

export type FolderType = BaseItem & {
  type: "folder"
  children: FileSystemItem[];
};

export type FileSystemItem =
  | FileType
  | FolderType;