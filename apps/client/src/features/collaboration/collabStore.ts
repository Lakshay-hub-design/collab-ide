import { create } from "zustand";

export type Collaborator = {
  id: string;

  name: string;

  color: string;

  avatar?: string;
};

export type ChatMessage = {
  id: string;

  userId: string;

  username: string;

  text: string;

  createdAt: number;
};

type CollabStore = {
  roomId: string | null;

  connected: boolean;

  collaborators: Collaborator[];

  isHost: boolean;

  setRoomId: (id: string | null) => void;

  setConnected: (value: boolean) => void;

  setCollaborators: (users: Collaborator[]) => void;

  setIsHost: (value: boolean) => void;

  resetRoom: () => void;

  messages: ChatMessage[];

  typingUsers: string[];

  addMessage: (message: ChatMessage) => void;

  setMessages: (messages: ChatMessage[]) => void;

  setTypingUsers: (users: string[]) => void;
};

export const useCollabStore = create<CollabStore>((set) => ({
  roomId: null,

  connected: false,

  collaborators: [],

  isHost: false,

  setRoomId: (roomId) =>
    set({
      roomId,
    }),

  setConnected: (connected) =>
    set({
      connected,
    }),

  setCollaborators: (collaborators) =>
    set({
      collaborators,
    }),

  setIsHost: (isHost) =>
    set({
      isHost,
    }),

  resetRoom: () =>
    set({
      roomId: null,

      connected: false,

      collaborators: [],

      isHost: false,
    }),
    
  messages: [],

  typingUsers: [],

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setMessages: (messages) =>
    set({
      messages,
    }),

  setTypingUsers: (typingUsers) =>
    set({
      typingUsers,
    }),
}));