import { create } from "zustand";

interface RoomFile {
  fileId: string;

  filename: string;

  content: string;

  language: string;
}

interface FileState {
  files: RoomFile[];

  activeFileId: string | null;

  setFiles: (files: RoomFile[]) => void;

  setActiveFile: (fileId: string) => void;

  updateFileContent: (fileId: string, content: string) => void;
}

export const useFileStore = create<FileState>((set) => ({
  files: [],

  activeFileId: null,

  setFiles: (files) =>
    set({
      files,

      activeFileId: files[0]?.fileId || null,
    }),

  setActiveFile: (fileId) =>
    set({
      activeFileId: fileId,
    }),

  updateFileContent: (fileId, content) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.fileId === fileId
          ? {
              ...file,
              content,
            }
          : file,
      ),
    })),
}));
