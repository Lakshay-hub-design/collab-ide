import { create } from "zustand";

interface CollaborationSate {
    code: string,

    setCode: (
        code: string
    ) => void
}

export const useCollaborationStore = create<CollaborationSate>((set) => ({
    code: "",

    setCode: (code) => set({code})
}))