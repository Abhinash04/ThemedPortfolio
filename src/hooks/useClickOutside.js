import { useEffect, useRef } from "react";

const defaultEvents = ["mousedown", "touchstart"];

export function useClickOutside(ref, onClickOutside, excludeRefs = [], events = defaultEvents) {
  const savedCallback = useRef(onClickOutside);

  useEffect(() => {
    savedCallback.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    const handler = (event) => {
      for (const excludeRef of excludeRefs) {
        const excludeEl = excludeRef.current;
        if (excludeEl && excludeEl.contains(event.target)) return;
      }

      const el = ref.current;
      if (!el || el.contains(event.target)) return;

      savedCallback.current(event);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handler);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler);
      }
    };
  }, [events, ref, excludeRefs]);
}
