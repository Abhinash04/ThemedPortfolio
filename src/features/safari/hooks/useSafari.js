import { useState } from "react";
import { checkURL } from "@/shared/utils";

export const useSafari = () => {
  const [history, setHistory] = useState([""]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentURL, setCurrentURL] = useState("");
  const [iframeLoading, setIframeLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const activeURL = history[historyIndex];

  const navigate = (url) => {
    let finalUrl = url;
    if (url.startsWith("mailto:")) {
      window.location.href = url;
      return;
    }

    if (url !== "") {
      const isValid = checkURL(url);
      if (isValid) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          finalUrl = `https://${url}`;
        }
      } else {
        finalUrl = `https://www.bing.com/search?q=${encodeURIComponent(url)}`;
      }
    }

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(finalUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentURL(finalUrl);
    setIframeLoading(finalUrl !== "");
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const prevUrl = history[historyIndex - 1];
      setCurrentURL(prevUrl);
      setIframeLoading(prevUrl !== "");
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const nextUrl = history[historyIndex + 1];
      setCurrentURL(nextUrl);
      setIframeLoading(nextUrl !== "");
    }
  };

  const goHome = () => {
    if (activeURL !== "") navigate("");
  };

  const refresh = () => {
    if (activeURL !== "") {
      setIframeLoading(true);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  return {
    history,
    historyIndex,
    currentURL,
    setCurrentURL,
    activeURL,
    iframeLoading,
    refreshKey,
    navigate,
    goBack,
    goForward,
    goHome,
    refresh,
    handleIframeLoad,
  };
};
