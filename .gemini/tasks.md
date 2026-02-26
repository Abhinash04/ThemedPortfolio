# MacOS Window Actions Implementation Plan

- [ ] Add `isMinimized` and `isMaximized` flags to `src/constants/window.constants.js`
- [ ] Add `minimizeWindow` and `maximizeWindow` actions to `src/store/window.js`
- [ ] Add `isMinimized` toggle inside `openWindow` logic
- [ ] Add `onClose` GSAP scale-down animation flow to `src/hoc/windowWrapper.jsx`
- [ ] Add `onMinimize` GSAP anim toward Dock bounds to `src/hoc/windowWrapper.jsx`
- [ ] Add `onMaximize` GSAP config covering `100vw, 100vh` space to `src/hoc/windowWrapper.jsx`
- [ ] Implement `isMinimized` CSS hide behavior conditionally within the Wrapper
- [ ] Trigger correct state toggle inside Dock click logic for minimized apps.
