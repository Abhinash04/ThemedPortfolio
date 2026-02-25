import { create } from "zustand";

export const useStore = create((set) => ({
  // System State
  dark: false,
  volume: 80,
  brightness: 80,
  wifi: true,
  bluetooth: true,
  airdrop: true,
  fullscreen: false,
  playing: false,

  // Toggles
  toggleDark: () => set((state) => ({ dark: !state.dark })),
  toggleWIFI: () => set((state) => ({ wifi: !state.wifi })),
  toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
  toggleAirdrop: () => set((state) => ({ airdrop: !state.airdrop })),
  toggleFullScreen: (v) => set(() => ({ fullscreen: v })),
  togglePlaying: () => set((state) => ({ playing: !state.playing })),

  // Setters
  setVolume: (v) => set(() => ({ volume: v })),
  setBrightness: (v) => set(() => ({ brightness: v })),
}));
