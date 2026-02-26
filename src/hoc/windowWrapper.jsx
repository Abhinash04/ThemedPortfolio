import { useWindowStore } from "@/store/window";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import { X, Minus, Maximize2 } from "lucide-react";

gsap.registerPlugin(useGSAP, Draggable);

const windowWrapper = (Component, windowKey, title) => {
  const Wrapped = (props) => {
    const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, windows } = useWindowStore();
    const windowState = windows[windowKey];
    const ref = useRef(null);

    const handleClose = (e) => {
      e.stopPropagation();
      gsap.to(ref.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => closeWindow(windowKey)
      });
    };

    const handleMinimize = (e) => {
      e.stopPropagation();
      
      const rect = ref.current.getBoundingClientRect();
      ref.current.dataset.prevTransform = ref.current.style.transform || "";
      ref.current.dataset.prevTop = ref.current.style.top || "";
      ref.current.dataset.prevLeft = ref.current.style.left || "";
      ref.current.dataset.prevWidth = ref.current.style.width || "";
      ref.current.dataset.prevHeight = ref.current.style.height || "";

      gsap.to(ref.current, {
        opacity: 0,
        scale: 0.5,
        y: window.innerHeight - rect.bottom + 100, 
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => minimizeWindow(windowKey)
      });
    };

    const handleMaximize = (e) => {
      e.stopPropagation();
      maximizeWindow(windowKey);
    };

    useGSAP(() => {
      if (!ref.current) return;
      
      if (windowState?.isOpen && !windowState?.isMinimized && !windowState?.isMaximized) {
        // Normal View
        gsap.to(ref.current, {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          top: ref.current.dataset.prevTop || "15%",
          left: ref.current.dataset.prevLeft || "20%",
          width: ref.current.dataset.prevWidth || "70vw",
          height: ref.current.dataset.prevHeight || "65vh",
          duration: 0.3,
          ease: "back.out(1.2)",
        });
        
        Draggable.create(ref.current, {
          type: "x,y",
          trigger: ref.current.querySelector(".window-handle"),
          bounds: "body",
          onPress: () => focusWindow(windowKey)
        });
      } else if (windowState?.isOpen && !windowState?.isMinimized && windowState?.isMaximized) {
        // Fullscreen View
        
        // Save current styles if not already saved via minimize
        if (!ref.current.dataset.prevWidth) {
          ref.current.dataset.prevTransform = ref.current.style.transform || "";
          ref.current.dataset.prevTop = ref.current.style.top || "";
          ref.current.dataset.prevLeft = ref.current.style.left || "";
          ref.current.dataset.prevWidth = ref.current.style.width || "";
          ref.current.dataset.prevHeight = ref.current.style.height || "";
        }
        
        gsap.to(ref.current, {
          top: 0,
          left: 0,
          x: 0,
          y: 0,
          width: "100vw",
          height: "100vh",
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Disable drag while maxed
        const draggables = Draggable.get(ref.current);
        if (draggables) draggables.disable();
        
      }
    }, [windowState?.isOpen, windowState?.isMinimized, windowState?.isMaximized]);

    if (!windowState || !windowState.isOpen) return null;

    const { zIndex, isMaximized, isMinimized } = windowState;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`absolute bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 flex flex-col opacity-0 scale-75 ${
          isMaximized 
            ? "w-screen h-screen max-w-none max-h-none rounded-none top-0 left-0" 
            : "w-[70vw] max-w-[800px] h-[65vh] max-h-[600px] top-[15%] left-[20%]"
        } ${isMinimized ? "pointer-events-none" : ""}`}
        onMouseDown={() => focusWindow(windowKey)}
      >
        <div className="h-8 bg-gray-800 flex items-center px-4 window-handle active:cursor-grabbing cursor-grab select-none">
          <div className="flex space-x-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
            >
              <X size={8} strokeWidth={3} className="opacity-0 group-hover:opacity-100 text-red-900" />
            </button>
            <button 
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group"
            >
              <Minus size={8} strokeWidth={3} className="opacity-0 group-hover:opacity-100 text-yellow-900" />
            </button>
            <button 
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group"
            >
              <Maximize2 size={8} strokeWidth={3} className="opacity-0 group-hover:opacity-100 text-green-900" />
            </button>
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
