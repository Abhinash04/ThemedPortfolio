import { locations } from "@/features/finder/constants";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/all";
import { useRef } from "react";
import { useWindowStore, useLocationStore } from "@/core/store";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  const containerRef = useRef(null);

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    const instances = Draggable.create(
      containerRef.current.querySelectorAll(".folder"),
      {
        onClick() {
          const id = this.target.dataset.projectId;
          const project = projects.find((p) => String(p.id) === id);
          if (project) handleOpenProjectFinder(project);
        },
      }
    );
    return () => instances.forEach((instance) => instance.kill());
  }, []);

  return (
    <section id="home" ref={containerRef}>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            data-project-id={project.id}
            className={clsx("group folder", project.windowPosition)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
