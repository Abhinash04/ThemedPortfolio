# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start Vite development server (port 3000, auto-open)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture Overview

This is a **React portfolio application** with a macOS-inspired desktop interface. The app renders draggable, resizable "windows" that can be opened, minimized, maximized, and closed.

### Core Structure

```text
src/
├── App.jsx           # Main app: Navbar, Welcome, Dock, and app components (Terminal, Skills, Safari)
├── main.jsx          # Entry point
├── index.css         # Tailwind v4 + custom CSS with @theme and @utility definitions
├── components/       # UI components (Navbar, Dock, Welcome, WindowsController, app windows)
├── configs/          # Configuration data (terminal file structure, wallpapers, websites)
├── constants/        # Constants for portfolio content, window state, UI, finder
├── hooks/            # Custom hooks (useTerminal, useSafari, useInterval)
├── store/            # Zustand state management (window store)
├── hoc/              # windowWrapper.jsx - HOC for draggable window behavior
└── utils/            # Utilities (url validation)
```

### State Management

**Zustand** (`src/store/window.js`) manages all window state:
- `windows`: Object keyed by window name (finder, contact, resume, safari, photos, terminal, skills, txtfile, imgfile)
- Each window has: `isOpen`, `isMinimized`, `isMaximized`, `zIndex`, `data`
- Actions: `openWindow`, `closeWindow`, `minimizeWindow`, `maximizeWindow`, `focusWindow`
- Uses `immer` middleware for immutable state updates

### Window System

The `windowWrapper` HOC (`src/hoc/windowWrapper.jsx`) provides:
- GSAP animations for open/close/minimize/maximize transitions
- Draggable behavior via `gsap/Draggable` with `.window-handle` as trigger
- Geometry preservation (saves position/size before maximize, restores on restore)
- Z-index management for focus stacking

### Key Dependencies

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling (uses `@theme`, `@utility`, `@layer` syntax)
- **Zustand** - State management
- **GSAP** + `@gsap/react` - Animations and draggable windows
- **Immer** - Immutable state updates
- **dayjs** - Date utilities
- **lucide-react** - Icons

### Terminal App

The terminal (`src/hooks/useTerminal.js`) simulates a shell with:
- Commands: `cd`, `ls`, `cat`, `clear`, `show`, `help`
- File system simulation via `terminalConfig` (`src/configs/terminal.jsx`)
- Auto-completion for commands and paths

### Safari App

The Safari browser (`src/hooks/useSafari.js`) provides:
- Navigation history (back/forward)
- URL validation and search fallback (Bing)
- Iframe-based page rendering

### Styling Patterns

- Custom fonts: Georama (sans), Roboto Mono (mono)
- Custom breakpoints: `3xl` (1920px)
- Utility classes: `flex-center`, `col-center`, `abs-center`
- Component classes scoped by ID: `#dock`, `#terminal`, `#safari`, etc.
- Wallpaper background from `/images/wallpaper.png`

### Path Alias

`@` resolves to `src/` (configured in `vite.config.js`)
