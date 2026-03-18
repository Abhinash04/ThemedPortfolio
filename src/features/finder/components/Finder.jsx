import { useState } from "react";
import { windowWrapper } from "@/features/system/hooks";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { locations } from "../constants";
import { useLocationStore } from "@/features/system/store";
import { useWindowStore } from "@/features/system/store";
import clsx from "clsx";

const FALLBACK_POSITIONS = [
  "top-5 left-5",
  "top-5 left-44",
  "top-5 right-10",
  "top-44 left-5",
  "top-44 left-44",
  "top-44 right-10",
];

const Finder = () => {
  const [navHistory, setNavHistory] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { openWindow, openInstance } = useWindowStore();
  const { activeLocation: rawActiveLocation, setActiveLocation } = useLocationStore();
  const activeLocation = rawActiveLocation ?? locations.work;

  const navigateTo = (item) => {
    setNavHistory((h) => [...h, activeLocation]);
    setForwardStack([]);
    setSelectedItem(null);
    setActiveLocation(item);
  };

  const goBack = () => {
    if (!navHistory.length) return;
    const prev = navHistory[navHistory.length - 1];
    setForwardStack((f) => [activeLocation, ...f]);
    setNavHistory((h) => h.slice(0, -1));
    setSelectedItem(null);
    setActiveLocation(prev);
  };

  const goForward = () => {
    if (!forwardStack.length) return;
    const next = forwardStack[0];
    setNavHistory((h) => [...h, activeLocation]);
    setForwardStack((f) => f.slice(1));
    setSelectedItem(null);
    setActiveLocation(next);
  };

  const handleSidebarClick = (item) => {
    setNavHistory([]);
    setForwardStack([]);
    setSelectedItem(null);
    setActiveLocation(item);
  };

  const jumpToHistoryItem = (index) => {
    const loc = navHistory[index];
    const remaining = navHistory.slice(0, index);
    const newForward = [activeLocation, ...navHistory.slice(index + 1), ...forwardStack];
    setNavHistory(remaining);
    setForwardStack(newForward);
    setSelectedItem(null);
    setActiveLocation(loc);
  };

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return navigateTo(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return openWindow("safari", { href: item.href, _blank: true });
    if (item.fileType === "img" && item.imageUrl)
      return openInstance("imgfile", item);
    if (item.fileType === "txt") return openInstance("txtfile", item);
  };

  const renderSidebarSection = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={`${item.id}-${item.name}`}
            role="button"
            tabIndex={0}
            onClick={() => handleSidebarClick(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                e.preventDefault();
                handleSidebarClick(item);
              }
            }}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active"
            )}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-4 h-4 object-contain shrink-0"
            />
            <span className="text-sm font-medium truncate">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="finder-toolbar">
        <div className="flex items-center gap-0.5">
          <button
            onClick={goBack}
            disabled={!navHistory.length}
            className="finder-nav-btn"
            aria-label="Go back"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goForward}
            disabled={!forwardStack.length}
            className="finder-nav-btn"
            aria-label="Go forward"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Breadcrumb path */}
        <div className="flex items-center gap-1 ml-3 text-xs font-medium overflow-hidden">
          {navHistory.map((loc, i) => (
            <span key={`${loc.id}-${i}`} className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => jumpToHistoryItem(i)}
                className="text-gray-400 hover:text-gray-700 hover:underline transition-colors"
              >
                {loc.name}
              </button>
              <ChevronRight size={10} className="text-gray-300 shrink-0" />
            </span>
          ))}
          <span className="text-gray-700 truncate">{activeLocation.name}</span>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="sidebar overflow-y-auto">
          {renderSidebarSection("Favorites", Object.values(locations))}
          {renderSidebarSection("My Projects", locations.work.children)}
        </div>

        <ul
          className="content"
          onClick={(e) => e.target === e.currentTarget && setSelectedItem(null)}
        >
          {activeLocation?.children?.map((item, index) => (
            <li
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={item.name}
              className={clsx(
                "group cursor-pointer select-none",
                item.position ?? FALLBACK_POSITIONS[index % FALLBACK_POSITIONS.length],
                selectedItem?.id === item.id && "finder-item-selected"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item);
              }}
              onDoubleClick={() => openItem(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                  e.preventDefault();
                  openItem(item);
                }
              }}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="transition-transform duration-200"
              />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SearchAction = <Search size={14} strokeWidth={2} className="text-gray-400" />;

const FinderWindow = windowWrapper(Finder, "finder", "finder", {
  titleBarActions: SearchAction,
  scrollableContent: true,
});

export default FinderWindow;
