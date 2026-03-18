# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture Overview

**Tech Stack:** React 19 + Vite 7 + Tailwind CSS 4 + Zustand + GSAP

### Feature-Based Structure

The codebase uses a feature-based architecture under `src/features/`:

- `system/` - Core window management, navigation, dock, welcome screen
- `terminal/` - Terminal emulator with command parsing and file system navigation
- `contact/` - Terminal-themed contact form with step-by-step input
- `safari/` - In-app browser with navigation history
- `finder/` - File/folder explorer with location-based navigation
- `portfolio/` - Resume, skills, and tech stack components
- `viewer/` - Dynamic text and image file viewers

### Window Management System

**Singleton windows** (managed by `windowWrapper` HOC): Terminal, Safari, Finder, Contact, Resume, Skills
- State: `useWindowStore` with `isOpen`, `isMinimized`, `isMaximized`, `zIndex`
- GSAP-driven animations for open/close/minimize/maximize
- Draggable via `gsap/all` Draggable plugin

**Multi-instance windows** (managed by `instanceWrapper` HOC): TextViewer, ImageViewer
- Stack offset positioning for cascading multiple instances
- Same animation/drag behavior as singletons

### State Management

- **Zustand** for window state (`src/features/system/store/window.store.js`)
- **Location store** for Finder navigation (`src/features/system/store/location.store.js`)
- Feature-specific state via custom hooks: `useTerminal`, `useSafari`, `useTerminalContactForm`

### Key Patterns

- **HOC wrappers**: `windowWrapper` and `instanceWrapper` provide consistent window behavior (drag, minimize, maximize, close animations)
- **Custom hooks**: Each feature exports a `useFeatureName` hook encapsulating its logic
- **Barrel exports**: Features use `index.js` files for clean imports via `@/features/<feature>`
- **GSAP animations**: All window transitions use GSAP for smooth animations

### Styling

- Tailwind CSS 4 with custom CSS classes for feature-specific styles (e.g., `.finder-toolbar`, `.sidebar`, `.content`)
- Base styles in `src/styles/index.css`
