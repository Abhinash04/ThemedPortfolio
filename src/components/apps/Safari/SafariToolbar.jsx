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
        <PanelLeft className="w-5 h-5 hover:bg-gray-200 p-0.5 rounded transition-colors" />
        <div className="flex items-center gap-1">
          <ChevronLeft 
            className={`w-5 h-5 p-0.5 rounded transition-colors ${historyIndex > 0 ? "hover:bg-gray-200 cursor-pointer text-gray-700" : "opacity-30 cursor-not-allowed text-gray-400"}`} 
            onClick={goBack} 
          />
          <ChevronRight 
            className={`w-5 h-5 p-0.5 rounded transition-colors ${historyIndex < historyLength - 1 ? "hover:bg-gray-200 cursor-pointer text-gray-700" : "opacity-30 cursor-not-allowed text-gray-400"}`} 
            onClick={goForward} 
          />
        </div>
        <Home 
          className="w-4 h-4 hover:bg-gray-200 rounded transition-colors cursor-pointer ml-1" 
          onClick={goHome} 
        />
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
          <RotateCw 
            className={`w-3.5 h-3.5 text-gray-400 hover:text-gray-700 cursor-pointer ${iframeLoading ? 'animate-spin' : ''}`}
            onClick={refresh}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-4 w-1/4">
        <Share className="w-4 h-4 hover:bg-gray-200 rounded transition-colors cursor-pointer" />
        <Plus className="w-5 h-5 hover:bg-gray-200 rounded transition-colors cursor-pointer" />
        <Copy className="w-4 h-4 hover:bg-gray-200 rounded transition-colors cursor-pointer" />
      </div>
    </div>
  );
};
