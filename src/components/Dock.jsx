import { useRef } from "react";
import { dockApps } from "@/constants";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowStore } from "@/store/window";

gsap.registerPlugin(useGSAP);

const Dock = () => {
  const { openWindow, focusWindow, windows } = useWindowStore();
  const dockRef = useRef(null);
  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = Array.from(dock.querySelectorAll(".dock-icon"));
    let rafId = null;
    let dockLeft = 0;
    let iconCenters = [];

    const recomputeGeometry = () => {
      const rect = dock.getBoundingClientRect();
      dockLeft = rect.left;
      iconCenters = icons.map((icon) => {
        const iconRect = icon.getBoundingClientRect();
        return iconRect.left - dockLeft + iconRect.width / 2;
      });
    };

    recomputeGeometry();

    const animateIcons = (mouseX) => {
      if (iconCenters.length === 0) {
        recomputeGeometry();
        if (iconCenters.length === 0) return;
      }
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        icons.forEach((icon, index) => {
          const distance = Math.abs(mouseX - iconCenters[index]);
          const intensity = Math.exp(-(distance ** 2.5) / 20000);
          gsap.to(icon, {
            scale: 1 + 0.25 * intensity,
            y: -15 * intensity,
            duration: 0.2,
            ease: "power1.out",
          });
        });
        rafId = null;
      });
    };

    const handleMouseMove = (e) => {
      animateIcons(e.clientX - dockLeft);
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      });
    };

    const handleResize = () => recomputeGeometry();

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAppClick = (id, canOpen) => {
    if (!canOpen) return;
    const window = windows[id];
    if (!window) {
      console.warn(`Window config for ${id} not found.`);
      return;
    }

    if (window.isOpen) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-place="top"
              data-tooltip-delay-show={200}
              data-tooltip-offset={20}
              disabled={!canOpen}
              onClick={() => handleAppClick(id, canOpen)}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
