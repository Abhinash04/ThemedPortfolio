import { useRef } from "react";
import { MenuItemGroup, MenuItem } from "./base";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function UserMenu({ toggleUserMenu, btnRef }) {
  const ref = useRef(null);

  useClickOutside(ref, toggleUserMenu, [btnRef]);

  return (
    <div 
      className="absolute top-10 left-2 w-56 bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-xl rounded-lg py-1 z-50 text-black dark:text-gray-100 text-sm" 
      ref={ref}
    >
      <MenuItemGroup>
        <MenuItem>About This Portfolio</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>System Preferences...</MenuItem>
        <MenuItem>App Store...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Recent Items</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Force Quit...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Sleep</MenuItem>
        <MenuItem>Restart...</MenuItem>
        <MenuItem>Shut Down...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup border={false}>
        <MenuItem>Lock Screen</MenuItem>
        <MenuItem>Log Out Abhinash...</MenuItem>
      </MenuItemGroup>
    </div>
  );
}
