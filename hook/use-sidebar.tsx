import { create } from "zustand";

interface SidebarStore {
    isCollapsed: boolean;
    onCollapse: () => void;
    onReset: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
    isCollapsed: false,
    onCollapse: () => set({ isCollapsed: true }),
    onReset: () => set({ isCollapsed: false }),
}));
