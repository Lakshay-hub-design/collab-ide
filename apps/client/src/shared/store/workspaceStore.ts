import { create } from "zustand";

type WorkspaceStore = {

  openSettings: boolean;

  setOpenSettings: (
    value: boolean
  ) => void;
};

export const useWorkspaceStore =
  create<WorkspaceStore>(
    (set) => ({

      openSettings: false,

      setOpenSettings: (
        value
      ) =>
        set({
          openSettings: value,
        }),
    })
  );