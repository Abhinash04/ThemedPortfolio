import { useRef } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { useStore } from "../../store";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useShallow } from "zustand/react/shallow";

const music = {
  title: "Faded",
  artist: "Alan Walker / Jesper Borgen",
  cover: "/music/thumbnail.png",
  audio: "/music/faded.mp3"
};

const SliderComponent = ({ icon, value, setValue }) => (
  <div className="relative flex w-full items-center justify-center">
    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 w-3.5 h-3.5 z-10 pointer-events-none">
      {icon}
    </div>
    <div className="w-full custom-slider">
      <Slider
        min={1}
        max={100}
        value={value}
        tooltip={false}
        orientation="horizontal"
        onChange={(v) => setValue(v)}
      />
    </div>
  </div>
);

export default function ControlCenterMenu({ toggleControlCenter, btnRef }) {
  const controlCenterRef = useRef(null);
  
  const { dark, wifi, brightness, bluetooth, airdrop, fullscreen, volume, playing } = useStore(
    useShallow((state) => ({
      dark: state.dark,
      wifi: state.wifi,
      brightness: state.brightness,
      bluetooth: state.bluetooth,
      airdrop: state.airdrop,
      fullscreen: state.fullscreen,
      volume: state.volume,
      playing: state.playing
    }))
  );
  
  const { toggleWIFI, toggleBluetooth, toggleAirdrop, toggleDark, toggleFullScreen, setBrightness, setVolume, togglePlaying } =
    useStore(useShallow((state) => ({
      toggleWIFI: state.toggleWIFI,
      toggleBluetooth: state.toggleBluetooth,
      toggleAirdrop: state.toggleAirdrop,
      toggleDark: state.toggleDark,
      toggleFullScreen: state.toggleFullScreen,
      setBrightness: state.setBrightness,
      setVolume: state.setVolume,
      togglePlaying: state.togglePlaying
    })));

  useClickOutside(controlCenterRef, toggleControlCenter, [btnRef]);

  return (
    <div
      className="absolute top-9 right-0 sm:right-1.5 w-84 h-auto bg-white/30 dark:bg-[#1C1C1E]/50 backdrop-blur-3xl border border-white/40 dark:border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_3px_rgba(0,0,0,0.05)] rounded-3xl p-3 text-black dark:text-gray-100 grid grid-cols-4 auto-rows-max gap-2.5 z-50 text-xs"
      ref={controlCenterRef}
    >
      <div className="col-span-2 row-span-2 bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/5 shadow-sm rounded-[14px] p-3 flex flex-col gap-3 justify-center">
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 flex-none rounded-full flex items-center justify-center cursor-pointer transition-colors ${wifi ? 'bg-blue-500 text-white' : 'bg-black/10 dark:bg-white/20 text-gray-700 dark:text-gray-200'}`} onClick={toggleWIFI}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="font-medium text-xs truncate leading-tight dark:text-white">Wi-Fi</span>
            <span className="text-gray-500 dark:text-gray-400 text-[10px] truncate leading-tight">{wifi ? "Home" : "Off"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 flex-none rounded-full flex items-center justify-center cursor-pointer transition-colors ${bluetooth ? 'bg-blue-500 text-white' : 'bg-black/10 dark:bg-white/20 text-gray-700 dark:text-gray-200'}`} onClick={toggleBluetooth}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11"/></svg>
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="font-medium text-xs truncate leading-tight dark:text-white">Bluetooth</span>
            <span className="text-gray-500 dark:text-gray-400 text-[10px] truncate leading-tight">{bluetooth ? "On" : "Off"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 flex-none rounded-full flex items-center justify-center cursor-pointer transition-colors ${airdrop ? 'bg-blue-500 text-white' : 'bg-black/10 dark:bg-white/20 text-gray-700 dark:text-gray-200'}`} onClick={toggleAirdrop}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16M4 20h.01"/></svg>
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="font-medium text-xs truncate leading-tight dark:text-white">AirDrop</span>
            <span className="text-gray-500 dark:text-gray-400 text-[10px] truncate leading-tight">{airdrop ? "Contacts Only" : "Off"}</span>
          </div>
        </div>
      </div>

      <div className="col-span-2 row-span-1 h-15 bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/5 shadow-sm rounded-[14px] px-3 flex items-center gap-2.5">
        <div className={`w-7 h-7 flex-none rounded-full flex items-center justify-center cursor-pointer transition-colors ${dark ? 'bg-blue-500 text-white' : 'bg-black/10 dark:bg-white/20 text-gray-700 dark:text-gray-200'}`} onClick={toggleDark}>
          {dark ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          )}
        </div>
        <div className="font-medium flex-1 truncate dark:text-white leading-tight">{dark ? "Dark Mode" : "Light Mode"}</div>
      </div>

      <div className="col-span-1 row-span-1 h-15 bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/5 shadow-sm rounded-[14px] flex items-center justify-center flex-col hover:bg-white/60 dark:hover:bg-white/20 transition-colors cursor-default">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mb-0.5 text-gray-700 dark:text-gray-200"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <span className="text-[9px] leading-[1.1] text-center font-medium dark:text-white px-0.5">Keyboard<br />Brightness</span>
      </div>

      <div className="col-span-1 row-span-1 h-15 bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/5 shadow-sm rounded-[14px] flex items-center justify-center flex-col hover:bg-white/60 dark:hover:bg-white/20 transition-colors cursor-pointer" onClick={() => toggleFullScreen(!fullscreen)}>
        {fullscreen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mb-1 text-gray-700 dark:text-gray-200"><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mb-1 text-gray-700 dark:text-gray-200"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        )}
        <span className="text-[9px] leading-[1.1] text-center font-medium dark:text-white px-0.5">{fullscreen ? "Exit" : "Enter"}<br />Fullscreen</span>
      </div>

      <div className="col-span-4 row-span-1 h-15 bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/5 shadow-sm rounded-[14px] px-2.5 flex flex-col justify-center gap-1.5 [&_.custom-slider_.rangeslider]:h-4.5! [&_.custom-slider_.rangeslider]:bg-black/5! [&_.custom-slider_.rangeslider]:shadow-none! dark:[&_.custom-slider_.rangeslider]:bg-black/40! [&_.custom-slider_.rangeslider__fill]:bg-white! dark:[&_.custom-slider_.rangeslider__fill]:bg-gray-500! [&_.custom-slider_.rangeslider__handle]:w-5.5! [&_.custom-slider_.rangeslider__handle]:h-5.5! dark:[&_.custom-slider_.rangeslider__handle]:border-none!">
        <span className="font-medium text-xs text-center dark:text-white leading-none">Display</span>
        <SliderComponent 
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>} 
          value={brightness} 
          setValue={setBrightness} 
        />
      </div>

      <div className="col-span-4 row-span-1 h-15 bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/5 shadow-sm rounded-[14px] px-2.5 flex flex-col justify-center gap-1.5 [&_.custom-slider_.rangeslider]:h-4.5! [&_.custom-slider_.rangeslider]:bg-black/5! [&_.custom-slider_.rangeslider]:shadow-none! dark:[&_.custom-slider_.rangeslider]:bg-black/40! [&_.custom-slider_.rangeslider__fill]:bg-white! dark:[&_.custom-slider_.rangeslider__fill]:bg-gray-500! [&_.custom-slider_.rangeslider__handle]:w-5.5! [&_.custom-slider_.rangeslider__handle]:h-5.5! dark:[&_.custom-slider_.rangeslider__handle]:border-none!">
        <span className="font-medium text-xs text-center dark:text-white leading-none">Sound</span>
        <SliderComponent 
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>} 
          value={volume} 
          setValue={setVolume} 
        />
      </div>

      <div className="col-span-4 row-span-1 h-20 bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/5 shadow-sm rounded-[14px] flex items-center gap-3 px-3">
        <img className="w-11 h-11 rounded-lg object-cover shadow-sm" src={music.cover} alt="cover art" />
        <div className="flex-1 overflow-hidden flex flex-col justify-center">
          <div className="font-medium text-xs truncate dark:text-white leading-tight">{music.title}</div>
          <div className="text-gray-500 dark:text-gray-400 text-[10px] truncate leading-tight mt-0.5">{music.artist}</div>
        </div>
        <div className="cursor-pointer text-gray-700 dark:text-gray-200 flex-none px-1 hover:text-black dark:hover:text-white transition-colors" onClick={togglePlaying}>
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M5 3l14 9-14 9V3z"/></svg>
          )}
        </div>
      </div>
    </div>
  );
}
