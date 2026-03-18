import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from "../constants";

let instanceCounter = 0;

export const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    instances: [],
    nextZIndex: INITIAL_Z_INDEX,

    // ── Singleton window actions ──────────────────────────────────────────
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        if (win.isMinimized) {
          win.isMinimized = false;
        } else {
          win.isOpen = true;
          win.data = data ?? win.data;
        }

        win.zIndex = state.nextZIndex++;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.isMinimized = false;
        win.isMaximized = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    minimizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win || !win.isOpen) return;
        win.isMinimized = true;
      }),
    maximizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win || !win.isOpen) return;
        win.isMaximized = !win.isMaximized;
        win.zIndex = state.nextZIndex++;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win || !win.isOpen || win.isMinimized) return;
        win.zIndex = state.nextZIndex++;
      }),

    // ── Multi-instance window actions ─────────────────────────────────────
    openInstance: (type, data = null) =>
      set((state) => {
        const stackOffset = state.instances.filter((i) => i.type === type).length;
        state.instances.push({
          id: `${type}-${++instanceCounter}`,
          type,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: state.nextZIndex++,
          data,
          stackOffset,
        });
      }),
    closeInstance: (id) =>
      set((state) => {
        const idx = state.instances.findIndex((i) => i.id === id);
        if (idx !== -1) state.instances.splice(idx, 1);
      }),
    minimizeInstance: (id) =>
      set((state) => {
        const inst = state.instances.find((i) => i.id === id);
        if (inst && inst.isOpen) inst.isMinimized = true;
      }),
    maximizeInstance: (id) =>
      set((state) => {
        const inst = state.instances.find((i) => i.id === id);
        if (inst && inst.isOpen) {
          inst.isMaximized = !inst.isMaximized;
          inst.zIndex = state.nextZIndex++;
        }
      }),
    focusInstance: (id) =>
      set((state) => {
        const inst = state.instances.find((i) => i.id === id);
        if (inst && inst.isOpen && !inst.isMinimized) inst.zIndex = state.nextZIndex++;
      }),
  })),
);
