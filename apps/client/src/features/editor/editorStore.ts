import { create } from "zustand";

import type {
  FileSystemItem,
  FileType,
} from "@/features/files/types/file.types";

import { isFile, isFolder } from "@/features/files/utils/fileGuards";

import { useProjectStore } from "../files/store/projectStore";

import { EDITOR_STORAGE_KEYS } from "@/shared/constants/editorStorage";

const activeProject = useProjectStore
  .getState()
  .projects.find(
    (project) => project.id === useProjectStore.getState().activeProjectId,
  );

type EditorStore = {
  files: FileSystemItem[];

  activeFileId: string;

  openTabs: string[];

  setActiveFile: (id: string) => void;

  updateFileContent: (id: string, content: string) => void;

  closeTab: (id: string) => void;

  createFile: (folderId: string | null, fileName: string) => void;

  createFolder: (parentFolderId: string | null, folderName: string) => void;

  renameItem: (id: string, name: string) => void;

  deleteFile: (id: string) => void;

  loadProjectFiles: (files: FileSystemItem[]) => void;
};

function persistProject(files: FileSystemItem[]) {
  const projectStore = useProjectStore.getState();

  const currentProject = projectStore.projects.find(
    (project) => project.id === projectStore.activeProjectId,
  );

  if (!currentProject) return;

  projectStore.saveProject({
    ...currentProject,

    files,

    updatedAt: Date.now(),
  });
}

function findFileById(items: FileSystemItem[], id: string): FileType | null {
  for (const item of items) {
    if (isFile(item) && item.id === id) {
      return item;
    }

    if (isFolder(item)) {
      const found = findFileById(item.children, id);

      if (found) return found;
    }
  }

  return null;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  files: activeProject?.files || [],

  activeFileId: localStorage.getItem(EDITOR_STORAGE_KEYS.ACTIVE_FILE) || "1",

  openTabs: JSON.parse(
    localStorage.getItem(EDITOR_STORAGE_KEYS.OPEN_TABS) || '["1"]',
  ),

  setActiveFile: (id) => {
    const { openTabs } = get();

    if (!openTabs.includes(id)) {
      set({
        openTabs: [...openTabs, id],
      });
    }

    set({
      activeFileId: id,
    });

    localStorage.setItem(EDITOR_STORAGE_KEYS.ACTIVE_FILE, id);

    localStorage.setItem(
      EDITOR_STORAGE_KEYS.OPEN_TABS,
      JSON.stringify([...new Set([...openTabs, id])]),
    );
  },

  updateFileContent: (id, content) => {
    function update(items: FileSystemItem[]): FileSystemItem[] {
      return items.map((item) => {
        if (isFile(item) && item.id === id) {
          return {
            ...item,
            content,
          };
        }

        if (isFolder(item)) {
          return {
            ...item,
            children: update(item.children),
          };
        }

        return item;
      });
    }

    set((state) => {
      const updatedFiles = update(state.files);

      persistProject(updatedFiles);

      return {
        files: updatedFiles,
      };
    });
  },

  closeTab: (id) => {
    const { openTabs, activeFileId } = get();

    const updatedTabs = openTabs.filter((tabId) => tabId !== id);

    let nextActive = activeFileId;

    if (activeFileId === id) {
      nextActive = updatedTabs[updatedTabs.length - 1] || "";
    }

    set({
      openTabs: updatedTabs,
      activeFileId: nextActive,
    });
  },

  createFile: (
  folderId,
  fileName
) => {

  const extension =
    fileName.split(".").pop();

  const languageMap: Record<
    string,
    string
  > = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    css: "css",
    html: "html",
    json: "json",
  };

  const newFile: FileType = {
    id: crypto.randomUUID(),

    type: "file",

    name: fileName,

    language:
      languageMap[
        extension || ""
      ] || "plaintext",

    content: "",
  };

  function addFile(
    items: FileSystemItem[]
  ): FileSystemItem[] {

    // ROOT LEVEL
    if (folderId === null) {
      return [
        ...items,
        newFile,
      ];
    }

    return items.map((item) => {

      if (
        isFolder(item) &&
        item.id === folderId
      ) {
        return {
          ...item,

          children: [
            ...item.children,
            newFile,
          ],
        };
      }

      if (isFolder(item)) {
        return {
          ...item,

          children: addFile(
            item.children
          ),
        };
      }

      return item;
    });
  }

  set((state) => {

    const updatedFiles =
      addFile(state.files);

    persistProject(
      updatedFiles
    );

    return {
      files: updatedFiles,
    };
  });
},

  deleteFile: (id) => {
    function remove(items: FileSystemItem[]): FileSystemItem[] {
      return items
        .filter((item) => item.id !== id)
        .map((item) => {
          if (isFolder(item)) {
            return {
              ...item,
              children: remove(item.children),
            };
          }

          return item;
        });
    }

    set((state) => {
      const updatedFiles = remove(state.files);

      persistProject(updatedFiles);

      return {
        files: updatedFiles,

        openTabs: state.openTabs.filter((tabId) => tabId !== id),

        activeFileId: state.activeFileId === id ? "" : state.activeFileId,
      };
    });
  },

  renameItem: (id, name) => {
    function rename(items: FileSystemItem[]): FileSystemItem[] {
      return items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name,
          };
        }

        if (isFolder(item)) {
          return {
            ...item,
            children: rename(item.children),
          };
        }

        return item;
      });
    }

    set((state) => {
      const updatedFiles = rename(state.files);

      persistProject(updatedFiles);

      return {
        files: updatedFiles,
      };
    });
  },

  createFolder: (parentFolderId, folderName) => {
    const newFolder = {
      id: crypto.randomUUID(),

      type: "folder" as const,

      name: folderName,

      children: [],
    };

    function addFolder(items: FileSystemItem[]): FileSystemItem[] {
      // ROOT LEVEL
      if (parentFolderId === null) {
        return [...items, newFolder];
      }

      return items.map((item) => {
        if (isFolder(item) && item.id === parentFolderId) {
          return {
            ...item,

            children: [...item.children, newFolder],
          };
        }

        if (isFolder(item)) {
          return {
            ...item,

            children: addFolder(item.children),
          };
        }

        return item;
      });
    }

    set((state) => {
      const updatedFiles = addFolder(state.files);

      persistProject(updatedFiles);

      return {
        files: updatedFiles,
      };
    });
  },

  loadProjectFiles: (files) =>
    set({
      files,

      openTabs: [],

      activeFileId: "",
    }),
}));

export { findFileById };
