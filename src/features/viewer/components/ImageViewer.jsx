import { useState } from "react";
import { instanceWrapper } from "@/features/system/hooks";
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react";

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const ImageViewer = ({ data }) => {
  const [prevImageUrl, setPrevImageUrl] = useState(null);
  const [zoomIndex, setZoomIndex] = useState(2); // default: 1× (index 2)
  const [rotation, setRotation] = useState(0);
  const [imgError, setImgError] = useState(false);

  if (!data) return null;

  const imageUrl = data.imageUrl;

  // Reset view state whenever a different image is opened (during render, before paint)
  if (imageUrl !== prevImageUrl) {
    setPrevImageUrl(imageUrl);
    setZoomIndex(2);
    setRotation(0);
    setImgError(false);
  }

  const { name } = data;
  const zoom = ZOOM_STEPS[zoomIndex];

  const zoomIn = () => setZoomIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
  const zoomOut = () => setZoomIndex((i) => Math.max(i - 1, 0));
  const rotate = () => setRotation((r) => (r + 90) % 360);

  return (
    <div className="h-full flex flex-col bg-[#3b3b3b]">
      {/* Image canvas */}
      <div className="preview flex-1 overflow-auto flex-center">
        {imgError ? (
          <div className="text-gray-400 text-sm text-center px-6">
            <p className="text-3xl mb-3">🖼️</p>
            <p>Unable to load image</p>
            <p className="text-xs mt-1 text-gray-500">{imageUrl}</p>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={name}
            onError={() => setImgError(true)}
            onLoad={() => setImgError(false)}
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transition: "transform 0.2s ease",
            }}
          />
        )}
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2a2a2a] border-t border-white/10 shrink-0">
        <p className="text-xs text-gray-400 truncate max-w-[40%]" title={name}>
          {name}
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            disabled={zoomIndex === 0}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Zoom out"
          >
            <ZoomOut size={14} />
          </button>

          <span className="text-xs text-gray-400 w-10 text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={zoomIndex === ZOOM_STEPS.length - 1}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Zoom in"
          >
            <ZoomIn size={14} />
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />

          <button
            onClick={rotate}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Rotate 90°"
          >
            <RotateCw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ImageViewerWindow = instanceWrapper(ImageViewer, "imgfile", "Preview", {
  scrollableContent: false,
});

export default ImageViewerWindow;
