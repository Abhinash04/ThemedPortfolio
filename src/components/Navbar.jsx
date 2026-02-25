import { useState, useRef } from "react";
import dayjs from "dayjs";
import { navLinks } from "@/constants";
import UserMenu from "./menus/UserMenu";
import WifiMenu from "./menus/WifiMenu";
import ControlCenterMenu from "./menus/ControlCenterMenu";
import Battery from "./menus/Battery";
import { useInterval } from "../hooks/useInterval";
import { useStore } from "../store";

const TopBarItem = ({ children, onClick, forceHover, className = "", btnRef }) => {
  const bg = forceHover ? "bg-black/10 dark:bg-white/10" : "hover:bg-black/10 dark:hover:bg-white/10";
  return (
    <div
      ref={btnRef}
      className={`flex items-center h-6 px-1.5 cursor-default rounded transition-colors ${bg} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [date, setDate] = useState(new Date());

  const userBtnRef = useRef(null);
  const wifiBtnRef = useRef(null);
  const modeBtnRef = useRef(null);
  
  const wifi = useStore((state) => state.wifi);

  useInterval(() => {
    setDate(new Date());
  }, 60 * 1000);

  const toggleMenu = (menu) => {
    if (activeMenu === menu) setActiveMenu(null);
    else setActiveMenu(menu);
  };

  return (
    <nav className="w-full h-7 px-1.5 fixed top-0 flex items-center justify-between z-40 text-[13px] font-medium text-black dark:text-white bg-white/40 dark:bg-[#1C1C1E]/50 backdrop-blur-2xl transition-colors select-none">
      <div className="flex items-center">
        <TopBarItem
          btnRef={userBtnRef}
          forceHover={activeMenu === "user"}
          onClick={() => toggleMenu("user")}
          className="cursor-pointer"
        >
          <img src="/images/logo.svg" alt="logo" className="w-[15px] h-[15px] object-contain" />
        </TopBarItem>
        <TopBarItem className="font-semibold pointer-events-none">
          Abhinash's Portfolio
        </TopBarItem>
        {navLinks.map(({ id, name }) => (
          <TopBarItem key={id} className="max-sm:hidden cursor-pointer">
            {name}
          </TopBarItem>
        ))}
      </div>

      {activeMenu === "user" && (
        <UserMenu toggleUserMenu={() => toggleMenu(null)} btnRef={userBtnRef} />
      )}

      <div className="flex items-center gap-1 pr-1">
        <TopBarItem className="max-sm:hidden cursor-default pointer-events-none">
          <Battery />
        </TopBarItem>

        <TopBarItem
          btnRef={wifiBtnRef}
          forceHover={activeMenu === "wifi"}
          onClick={() => toggleMenu("wifi")}
          className="cursor-pointer"
        >
          {wifi ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          )}
        </TopBarItem>

        <TopBarItem className="cursor-pointer">
          <img src="/icons/search.svg" alt="search" className="w-4 h-4 object-contain invert-0 dark:invert" />
        </TopBarItem>

        <TopBarItem
          btnRef={modeBtnRef}
          forceHover={activeMenu === "control"}
          onClick={() => toggleMenu("control")}
          className="cursor-pointer"
        >
          <img src="/icons/mode.svg" alt="mode" className="w-4 h-4 object-contain invert-0 dark:invert" />
        </TopBarItem>

        {activeMenu === "wifi" && (
          <WifiMenu toggleWifiMenu={() => toggleMenu(null)} btnRef={wifiBtnRef} />
        )}

        {activeMenu === "control" && (
          <ControlCenterMenu toggleControlCenter={() => toggleMenu(null)} btnRef={modeBtnRef} />
        )}

        <TopBarItem className="gap-2">
          <span>{dayjs(date).format("ddd MMM D")}</span>
          <span>{dayjs(date).format("h:mm A")}</span>
        </TopBarItem>
      </div>
    </nav>
  );
};

export default Navbar;
