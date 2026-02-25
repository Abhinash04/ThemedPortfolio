import { useBattery } from "../../hooks/useBattery";

export default function Battery() {
  const batteryState = useBattery();

  const width = () => {
    return 0.1 + batteryState.level * 0.96;
  };

  const color = () => {
    if (batteryState.charging) return "bg-green-400";
    if (batteryState.level < 0.2) return "bg-red-500";
    if (batteryState.level < 0.5) return "bg-yellow-500";
    return "bg-black";
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs">{(batteryState.level * 100).toFixed()}%</span>
      <div className="relative flex items-center">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17 6h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3v-2h3V8h-3V6zM3 8h12v8H3V8zm2 2v4h8v-4H5z"/></svg>
        <div className={`absolute left-[0.14rem] top-1/2 -translate-y-1/2 h-[0.45rem] rounded-sm transition-all ${color()}`} style={{ width: `${width()}rem` }} />
        {batteryState.charging && (
          <svg viewBox="0 0 16 16" fill="currentColor" className="absolute inset-0 m-auto -translate-x-[0.1rem] w-3 h-3 text-black"><path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"/></svg>
        )}
      </div>
    </div>
  );
}
