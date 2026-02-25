import { useRef } from "react";
import { useStore } from "../../store";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useShallow } from "zustand/react/shallow";

export default function WifiMenu({ toggleWifiMenu, btnRef }) {
  const wifiRef = useRef(null);
  const { wifi, toggleWIFI } = useStore(useShallow((state) => ({
    wifi: state.wifi,
    toggleWIFI: state.toggleWIFI
  })));

  useClickOutside(wifiRef, toggleWifiMenu, [btnRef]);

  return (
    <div
      className="absolute top-10 right-0 sm:right-2 w-80 max-w-full h-11 bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-xl rounded-lg flex items-center justify-between px-2 py-0.5 z-50 text-black dark:text-gray-100"
      ref={wifiRef}
    >
      <div className="px-2.5 font-medium text-sm">Wi-Fi</div>
      <div className="px-2.5">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={wifi} onChange={toggleWIFI} />
          <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>
    </div>
  );
}
