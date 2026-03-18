import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useLocationStore = create(
  immer((set) => ({
    activeLocation: null,
    setActiveLocation: (location) =>
      set((state) => {
        state.activeLocation = location ?? null;
      }),
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = null;
      }),
  })),
);

export default useLocationStore;
