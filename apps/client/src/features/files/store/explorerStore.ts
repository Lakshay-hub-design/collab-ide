import { create } from "zustand";

import {
  saveProjectSession,
  loadProjectSession,
} from "@/shared/utils/projectSession";

import { useProjectStore } from "../store/projectStore";

import { useEditorStore } from "@/features/editor/editorStore";

type CreateState = {
  parentId: string | null;

  type: "file" | "folder";
};

type ContextMenuState = {
  x: number;

  y: number;

  itemId: string;
};

type ExplorerStore = {
  openFolders: string[];

  renamingId: string | null;

  renameValue: string;

  creating: CreateState | null;

  newItemName: string;

  contextMenu: ContextMenuState | null;

  toggleFolder: (id: string) => void;

  setRenamingId: (id: string | null) => void;

  setRenameValue: (value: string) => void;

  setCreating: (value: CreateState | null) => void;

  setNewItemName: (value: string) => void;

  setContextMenu: (value: ContextMenuState | null) => void;

  resetExplorer: () => void;
};

const savedOpenFolders = JSON.parse(
  localStorage.getItem("open-folders") || "[]",
);

export const useExplorerStore = create<ExplorerStore>((set) => ({
  openFolders: savedOpenFolders,

  renamingId: null,

  renameValue: "",

  creating: null,

  newItemName: "",

  contextMenu: null,

  toggleFolder: (id) =>
    set((state) => {
      const updated = state.openFolders.includes(id)
        ? state.openFolders.filter((folderId) => folderId !== id)
        : [...state.openFolders, id];

        const projectId =
  useProjectStore.getState()
    .activeProjectId;

if (projectId) {

  const editorState =
    useEditorStore.getState();

  saveProjectSession(
    projectId,

    {
      openFolders:
        updated,

      openTabs:
        editorState.openTabs,

      activeFileId:
        editorState.activeFileId,
    }
  );
}

      localStorage.setItem("open-folders", JSON.stringify(updated));

      return {
        openFolders: updated,
      };
    }),

  setRenamingId: (id) =>
    set({
      renamingId: id,
      creating: null,
    }),

  setRenameValue: (value) =>
    set({
      renameValue: value,
    }),

  setCreating: (value) =>
    set({
      creating: value,
      renamingId: null,
    }),

  setNewItemName: (value) =>
    set({
      newItemName: value,
    }),

  setContextMenu: (value) =>
    set({
      contextMenu: value,
    }),

    resetExplorer: () =>
      set({
        openFolders: [],

        renamingId: null,

        renameValue: "",

        creating: null,

        newItemName: "",

        contextMenu: null,
      }),
}));
