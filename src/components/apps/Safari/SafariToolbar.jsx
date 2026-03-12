import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
  RotateCw,
  Home
} from "lucide-react";

export const SafariToolbar = ({
  historyIndex,
  historyLength,
  activeURL,
  currentURL,
  setCurrentURL,
  iframeLoading,
  goBack,
  goForward,
  goHome,
  refresh,
  navigate
}) => {
  const pressURL = (e) => {
    if (e.key === "Enter") {
      navigate(currentURL);
      e.target.blur();
    }
  };

  return (
    <div className="flex flex-row items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200 select-none text-sm text-gray-500 h-[50px] shrink-0">
      <div className="flex items-center gap-3 w-1/4">
        <PanelLeft className="w-5 h-5 text-gray-400 p-0.5" />
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Go Back"
            onClick={goBack}
            disabled={historyIndex <= 0}
            className={`rounded transition-colors ${historyIndex > 0 ? "hover:bg-gray-200 cursor-pointer text-gray-700" : "opacity-30 cursor-not-allowed text-gray-400"}`}
          >
            <ChevronLeft className="w-5 h-5 p-0.5" />
          </button>
          <button
            type="button"
            aria-label="Go Forward"
            onClick={goForward}
            disabled={historyIndex >= historyLength - 1}
            className={`rounded transition-colors ${historyIndex < historyLength - 1 ? "hover:bg-gray-200 cursor-pointer text-gray-700" : "opacity-30 cursor-not-allowed text-gray-400"}`}
          >
            <ChevronRight className="w-5 h-5 p-0.5" />
          </button>
        </div>
        <button
          type="button"
          aria-label="Go Home"
          onClick={goHome}
          className="hover:bg-gray-200 rounded transition-colors ml-1 p-0.5"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="flex flex-1 justify-center items-center gap-3 max-w-2xl">
        <ShieldHalf className={`w-5 h-5 ${activeURL !== "" ? "text-green-600" : "text-gray-400"}`} />
        <div className="flex items-center gap-2 w-full max-w-lg bg-white border border-gray-200/80 shadow-sm rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-400/50 focus-within:border-blue-400 transition-all">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={currentURL}
            onChange={(e) => setCurrentURL(e.target.value)}
            onKeyDown={pressURL}
            placeholder="Search or enter website name"
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
            spellCheck={false}
            autoComplete="off"
          />
          <button
            type="button"
            aria-label="Refresh window"
            onClick={refresh}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded p-0.5"
          >
            <RotateCw className={`w-3.5 h-3.5 ${iframeLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-4 w-1/4">
        <Share className="w-4 h-4 text-gray-400" />
        <Plus className="w-5 h-5 text-gray-400" />
        <Copy className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};
