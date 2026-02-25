import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { useStore } from "./store";
import { useShallow } from "zustand/react/shallow";

const App = () => {
  const audioRef = useRef(null);

  const { brightness, volume, playing, dark } = useStore(useShallow((state) => ({
    brightness: state.brightness,
    volume: state.volume,
    playing: state.playing,
    dark: state.dark
  })));

  // Sync audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Sync audio playing state
  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(e => console.warn("Audio play blocked by browser:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  return (
    <main
      className={`w-screen h-screen overflow-hidden transition-all duration-300 relative text-black dark:text-white ${dark ? "dark" : ""}`}
      style={{ filter: `brightness(${(brightness * 0.7) + 50}%)` }}
    >
      <Navbar />
      <audio ref={audioRef} src="/music/faded.mp3" loop />
    </main>
  );
}

export default App;