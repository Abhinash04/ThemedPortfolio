import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { navIcons, navLinks } from "@/constants";
import { useWindowStore } from "@/store/window";

const Navbar = () => {
  const openWindow = useWindowStore((state) => state.openWindow);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Abhinash Pritiraj's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id}>
              <button type="button" onClick={() => openWindow(type)}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time>{dayjs(now).format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
