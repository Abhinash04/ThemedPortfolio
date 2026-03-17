import { useRef, useState, useEffect } from "react";
import windowWrapper from "@/hoc/windowWrapper";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setPageWidth(el.clientWidth - 32);
    });
    observer.observe(el);
    setPageWidth(el.clientWidth - 32);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full px-4 py-4">
      {loadError && <div className="text-sm text-red-500 mb-2">{loadError}</div>}
      <Document
        file="files/ResumeAbhinashPritiraj.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={() => setLoadError("Error loading PDF.")}
        className="flex flex-col items-center gap-4"
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              width={pageWidth || undefined}
              renderTextLayer
              renderAnnotationLayer
            />
          ))}
      </Document>
    </div>
  );
};

const DownloadAction = (
  <a
    href="files/ResumeAbhinashPritiraj.pdf"
    download="ResumeAbhinashPritiraj.pdf"
    className="text-gray-400 hover:text-white transition-colors"
    title="Download Resume"
  >
    <Download size={14} strokeWidth={2} />
  </a>
);

const ResumeWindow = windowWrapper(Resume, "resume", "resume", {
  titleBarActions: DownloadAction,
  scrollableContent: true,
});

export default ResumeWindow;
