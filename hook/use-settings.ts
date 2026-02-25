import { create } from "zustand";

interface useSettingsStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}

export const useSettings = create<useSettingsStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onToggle: () => set({ isOpen: !get().isOpen }),
}));
