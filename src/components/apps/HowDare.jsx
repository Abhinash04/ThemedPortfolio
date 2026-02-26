import React, { useState, useEffect, useRef } from "react";
import useInterval from "@/hooks/useInterval";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789落霞与孤鹜齐飞秋水共长天一色";
const EMOJIS = ["\\(o_o)/", "(˚Δ˚)b", "(^-^*)", "(╯‵□′)╯", "\\(°ˊДˋ°)/", "╰(‵□′)╯"];

const getEmoji = () => {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
};

const HowDare = ({ setRMRF }) => {
  const FONT_SIZE = 12;

  const [emoji] = useState(getEmoji);
  const dropsRef = useRef([]);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;

    const columns = Math.floor(canvas.width / FONT_SIZE);
    dropsRef.current = Array(columns).fill(1);
  }, []);

  const rain = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#2e9244";
    ctx.font = `${FONT_SIZE}px arial`;

    const nextDrops = [...dropsRef.current];
    nextDrops.forEach((y, x) => {
      const text = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      ctx.fillText(text, x * FONT_SIZE, y * FONT_SIZE);
      
      if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
        nextDrops[x] = 1;
      } else {
        nextDrops[x] = y + 1;
      }
    });
    dropsRef.current = nextDrops;
  };

  useInterval(rain, 33);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-black text-white z-50 pointer-events-auto"
      onClick={() => setRMRF(false)}
    >
      <canvas ref={canvasRef}></canvas>
      <div className="font-avenir absolute h-28 text-center space-y-4 m-auto inset-0">
        <div className="text-4xl">{emoji}</div>
        <div className="text-3xl">HOW DARE YOU!</div>
        <div>Click to go back</div>
      </div>
    </div>
  );
};

export default HowDare;
