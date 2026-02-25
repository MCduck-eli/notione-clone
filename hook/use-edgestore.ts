import { create } from "zustand";

interface EdgeStore {
    url?: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onReplace: (url: string) => void;
}

export const useEdgestore = create<EdgeStore>((set) => ({
    url: undefined,
    isOpen: false,
    onOpen: () => set({ isOpen: true, url: undefined }),
    onClose: () => set({ isOpen: false, url: undefined }),
    onReplace: (url) => set({ isOpen: true, url }),
}));
