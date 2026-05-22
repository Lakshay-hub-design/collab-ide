import { create } from "zustand";

interface TypingUser {
  userId: string;
  username: string;
}

interface TypingState {
  typingUsers: TypingUser[];

  addTypingUser: (user: TypingUser) => void;

  removeTypingUser: (userId: string) => void;
}

export const useTypingStore = create<TypingState>((set) => ({
  typingUsers: [],

  addTypingUser: (user) =>
    set((state) => {
      const exists = state.typingUsers.find((u) => u.userId === user.userId);

      if (exists) {
        return state;
      }

      return {
        typingUsers: [...state.typingUsers, user],
      };
    }),

  removeTypingUser: (userId) =>
    set((state) => ({
      typingUsers: state.typingUsers.filter((u) => u.userId !== userId),
    })),
}));
