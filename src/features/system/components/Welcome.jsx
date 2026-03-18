import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 100, max: 900, default: 400 },
};
const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00a0" : char}
    </span>
  ));
};
const setupTextHover = (container, type) => {
  if (!container) return;
  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHT[type];
  let rafId = null;
  let containerLeft = 0;
  let letterCenters = [];

  const recomputeGeometry = () => {
    const containerRect = container.getBoundingClientRect();
    containerLeft = containerRect.left;
    letterCenters = Array.from(letters, (letter) => {
      const rect = letter.getBoundingClientRect();
      return rect.left - containerLeft + rect.width / 2;
    });
  };

  recomputeGeometry();

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      fontVariationSettings: `'wght' ${weight}`,
      ease: "power3.out",
    });
  };

  const handleMouseMove = (e) => {
    const mouseX = e.clientX - containerLeft;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      letters.forEach((letter, index) => {
        const distance = Math.abs(mouseX - letterCenters[index]);
        const intensity = Math.exp(-(distance ** 2) / 20000);
        animateLetter(letter, min + (max - min) * intensity);
      });
      rafId = null;
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  const handleResize = () => recomputeGeometry();

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  window.addEventListener("resize", handleResize);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
    window.removeEventListener("resize", handleResize);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  useGSAP(() => {
    const cleanupTitle = setupTextHover(titleRef.current, "title");
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      if (cleanupTitle) cleanupTitle();
      if (cleanupSubtitle) cleanupSubtitle();
    };
  });
  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I am Abhinash! Welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("Portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop view</p>
      </div>
    </section>
  );
};

export default Welcome;
