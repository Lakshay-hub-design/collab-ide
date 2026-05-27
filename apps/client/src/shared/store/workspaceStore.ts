import { create } from "zustand";

export type RightPanelType =
  | "ai"
  | "collab"
  | "chat"
  | null;

type WorkspaceStore = {

  openSettings: boolean;

  setOpenSettings: (
    value: boolean
  ) => void;

  activeRightPanel : RightPanelType

  setActiveRightPanel : (panel: RightPanelType) => void
};



export const useWorkspaceStore =
  create<WorkspaceStore>(
    (set) => ({

      openSettings: false,
      activeRightPanel: 'ai',

      setOpenSettings: (
        value
      ) =>
        set({
          openSettings: value,
        }),

      setActiveRightPanel: (activeRightPanel) => set({
        activeRightPanel
      })
    })    
  );