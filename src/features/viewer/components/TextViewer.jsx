import { instanceWrapper } from "@/features/system/hooks";

const TextViewer = ({ data }) => {
  if (!data) return null;

  const { name, image, subtitle, description = [] } = data;

  return (
    <div className="h-full overflow-y-auto bg-[#f9f8f6]">
      <div className="max-w-md mx-auto px-8 py-10">
        {/* File header */}
        <div className="mb-6 text-center">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-5 shadow-md ring-4 ring-white"
            />
          )}
          <h2>{name.replace(/\.[^/.]+$/, "")}</h2>
          {subtitle && (
            <p className="mt-1.5 text-sm text-gray-500 font-medium">{subtitle}</p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-6" />

        {/* Body paragraphs */}
        <div className="space-y-4">
          {description.map((para, i) => (
            <p key={i} className="text-sm text-gray-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const TextViewerWindow = instanceWrapper(TextViewer, "txtfile", "Text Viewer", {
  scrollableContent: false,
});

export default TextViewerWindow;
