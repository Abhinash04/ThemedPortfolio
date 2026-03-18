// system shell UI + app-level store hook
export { Navbar, Welcome, Dock } from "@/features/system/components";
export { useWindowStore } from "@/features/system/store";

// portfolio windows
export { Skills, Resume } from "@/features/portfolio/components";

// file manager
export { Finder } from "@/features/finder/components";

// multi-instance file viewers
export { TextViewer, ImageViewer } from "@/features/viewer/components";

// windowed apps (default exports lifted to named)
export { default as Terminal } from "@/features/terminal";
export { default as Safari } from "@/features/safari";
export { default as Contact } from "@/features/contact";
