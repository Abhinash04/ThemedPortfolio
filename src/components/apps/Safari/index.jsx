import { RefreshCw } from "lucide-react";
import windowWrapper from "@/hoc/windowWrapper";
import { useSafari } from "@/hooks/useSafari";
import { SafariToolbar } from "./SafariToolbar";
import NavPage from "./NavPage";

const Safari = () => {
  const safariState = useSafari();

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <SafariToolbar historyLength={safariState.history.length} {...safariState} />
      
      {/* Content Area */}
      <div className="flex-1 relative w-full h-full bg-white">
        {safariState.activeURL === "" ? (
          <NavPage setGoURL={safariState.navigate} />
        ) : (
          <>
            {safariState.iframeLoading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
                  <p className="text-sm font-medium text-gray-600">Loading {safariState.activeURL}...</p>
                </div>
              </div>
            )}
            <iframe
              key={safariState.refreshKey}
              src={safariState.activeURL}
              className="w-full h-full border-none outline-none"
              title="Safari Browser"
              onLoad={safariState.handleIframeLoad}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </>
        )}
      </div>
    </div>
  );
};

const SafariWindow = windowWrapper(Safari, "safari");
export default SafariWindow;
