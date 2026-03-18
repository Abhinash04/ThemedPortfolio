import { useWindowStore } from "@/features/system/store";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import { WindowsController } from "@/features/system/components";

gsap.registerPlugin(useGSAP, Draggable);


const WINDOW_DEFAULT_POSITIONS = {
  txtfile: { top: "18%", left: "30%" },
  imgfile: { top: "22%", left: "36%" },
};

const STACK_OFFSET_PX = 30;

const GEOMETRY_KEYS = ["prevTransform", "prevTop", "prevLeft", "prevWidth", "prevHeight"];

const manageGeometryDataset = {
  getPrev: (key, el) => {
    if (el.dataset[key] !== undefined) return el.dataset[key];
    const cssKey = key.replace("prev", "").toLowerCase();
    return el.style[cssKey] || undefined;
  },
  setPrev: (key, value, el) => {
    el.dataset[key] = value;
  },
  clearPrevKeys: (el) => {
    GEOMETRY_KEYS.forEach((k) => { delete el.dataset[k]; });
  },
};

const saveGeometry = (el) => {
  GEOMETRY_KEYS.forEach((key) => {
    if (el.dataset[key] === undefined) {
      manageGeometryDataset.setPrev(key, manageGeometryDataset.getPrev(key, el) ?? "", el);
    }
  });
};

const instanceWrapper = (Component, windowType, title, options = {}) => {
  const { titleBarActions, scrollableContent } = options;

  const Wrapped = ({ instanceId }) => {
    const {
      focusInstance,
      closeInstance,
      minimizeInstance,
      maximizeInstance,
      instances,
    } = useWindowStore();

    const instanceState = instances.find((i) => i.id === instanceId);
    const ref = useRef(null);
    const mountedRef = useRef(true);
    const closeTweenRef = useRef(null);
    const minimizeTweenRef = useRef(null);

    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
        if (closeTweenRef.current) {
          closeTweenRef.current.kill();
          closeTweenRef.current = null;
        }
        if (minimizeTweenRef.current) {
          minimizeTweenRef.current.kill();
          minimizeTweenRef.current = null;
        }
      };
    }, []);

    const handleClose = (e) => {
      e.stopPropagation();
      closeTweenRef.current = gsap.to(ref.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          if (mountedRef.current) closeInstance(instanceId);
        },
      });
    };

    const handleMinimize = (e) => {
      e.stopPropagation();
      const rect = ref.current.getBoundingClientRect();
      saveGeometry(ref.current);
      minimizeTweenRef.current = gsap.to(ref.current, {
        opacity: 0,
        scale: 0.5,
        y: window.innerHeight - rect.bottom + 100,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          if (mountedRef.current) minimizeInstance(instanceId);
        },
      });
    };

    const handleMaximize = (e) => {
      e.stopPropagation();
      maximizeInstance(instanceId);
    };

    useGSAP(() => {
      const node = ref.current;
      if (!node) return;

      if (
        instanceState?.isOpen &&
        !instanceState?.isMinimized &&
        !instanceState?.isMaximized
      ) {
        const defaultPos = WINDOW_DEFAULT_POSITIONS[windowType] ?? { top: "15%", left: "20%" };
        const offset = (instanceState?.stackOffset ?? 0) * STACK_OFFSET_PX;
        const prevTransform = manageGeometryDataset.getPrev("prevTransform", node) ?? "";

        gsap.to(node, {
          scale: 1,
          opacity: 1,
          top: manageGeometryDataset.getPrev("prevTop", node) ?? `calc(${defaultPos.top} + ${offset}px)`,
          left: manageGeometryDataset.getPrev("prevLeft", node) ?? `calc(${defaultPos.left} + ${offset}px)`,
          width: manageGeometryDataset.getPrev("prevWidth", node) ?? "70vw",
          height: manageGeometryDataset.getPrev("prevHeight", node) ?? "65vh",
          duration: 0.3,
          ease: "back.out(1.2)",
          onStart: () => {
            if (prevTransform) node.style.transform = prevTransform;
          },
          onComplete: () => {
            manageGeometryDataset.clearPrevKeys(node);
          },
        });

        const existingDraggable = Draggable.get(node);
        if (existingDraggable) existingDraggable.kill();

        Draggable.create(node, {
          type: "x,y",
          trigger: node.querySelector(".window-handle"),
          bounds: "body",
          onPress: () => focusInstance(instanceId),
        });
      } else if (
        instanceState?.isOpen &&
        !instanceState?.isMinimized &&
        instanceState?.isMaximized
      ) {
        if (node.dataset.prevWidth === undefined) saveGeometry(node);

        gsap.to(node, {
          top: 0,
          left: 0,
          x: 0,
          y: 0,
          width: "100vw",
          height: "100vh",
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        const existingDraggable = Draggable.get(node);
        if (existingDraggable) existingDraggable.disable();
      }

      return () => {
        if (node) {
          const existingDraggable = Draggable.get(node);
          if (existingDraggable) existingDraggable.kill();
        }
      };
    }, [
      instanceState?.isOpen,
      instanceState?.isMinimized,
      instanceState?.isMaximized,
    ]);

    if (!instanceState || !instanceState.isOpen) return null;

    const { zIndex, isMaximized, isMinimized, data } = instanceState;

    return (
      <section
        id={instanceId}
        ref={ref}
        style={{ zIndex }}
        className={`absolute bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 flex flex-col opacity-0 scale-75 ${
          isMaximized
            ? "w-screen h-screen max-w-none max-h-none rounded-none top-0 left-0"
            : "w-[70vw] max-w-[800px] h-[65vh] max-h-[600px] top-[15%] left-[20%]"
        } ${isMinimized ? "pointer-events-none" : ""}`}
        onMouseDown={() => focusInstance(instanceId)}
      >
        <div className="h-8 bg-gray-800 flex-center px-4 window-handle active:cursor-grabbing cursor-grab select-none">
          <WindowsController
            handleClose={handleClose}
            handleMinimize={handleMinimize}
            handleMaximize={handleMaximize}
          />
          <div className="flex-1 text-center text-xs text-gray-400 font-medium font-sans">
            {title || windowType}
          </div>
          {titleBarActions && (
            <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
              {titleBarActions}
            </div>
          )}
        </div>
        <div className={`flex-1 ${scrollableContent ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"}`}>
          <Component data={data} />
        </div>
      </section>
    );
  };

  Wrapped.displayName = `InstanceWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default instanceWrapper;
