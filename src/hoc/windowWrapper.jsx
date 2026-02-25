import { useWindowStore } from "@/store/window";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";

gsap.registerPlugin(useGSAP, Draggable);

const windowWrapper = (Component, windowKey, title) => {
  const Wrapped = (props) => {
    const { focusWindow, closeWindow, windows } = useWindowStore();
    const windowState = windows[windowKey];
    const ref = useRef(null);

    useGSAP(() => {
      if (windowState?.isOpen && ref.current) {
        Draggable.create(ref.current, {
          type: "x,y",
          trigger: ".window-handle",
          bounds: "body",
          onPress: () => focusWindow(windowKey)
        });
      }
    }, [windowState?.isOpen]);

    if (!windowState || !windowState.isOpen) return null;

    const { zIndex } = windowState;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex, top: "15%", left: "20%" }}
        className="absolute w-[70vw] max-w-[800px] h-[65vh] max-h-[600px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 flex flex-col"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <div className="h-8 bg-gray-800 flex items-center px-4 window-handle active:cursor-grabbing cursor-grab select-none">
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(windowKey);
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] text-red-900 leading-none">
                x
              </span>
            </button>
            <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"></button>
            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"></button>
          </div>
          <div className="flex-1 text-center text-xs text-gray-400 font-medium font-sans">
            {title || windowKey}
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <Component {...props} />
        </div>
      </section>
    );
  };
  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default windowWrapper;
