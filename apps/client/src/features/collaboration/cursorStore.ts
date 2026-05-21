import { create } from "zustand";

interface CursorUser {
  userId: string;
  username: string;

  lineNumber: number;
  column: number;
}

interface CursorState {
  cursors: CursorUser[];

  updateCursor: (cursor: CursorUser) => void;

  removeCursor: (userId: string) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  cursors: [],

  updateCursor: (cursor) =>
    set((state) => {
      const existing = state.cursors.find((c) => c.userId === cursor.userId);

      if (existing) {
        return {
          cursors: state.cursors.map((c) =>
            c.userId === cursor.userId ? cursor : c,
          ),
        };
      }

      return {
        cursors: [...state.cursors, cursor],
      };
    }),

  removeCursor: (userId) =>
    set((state) => ({
      cursors: state.cursors.filter((cursor) => cursor.userId !== userId),
    })),
}));
