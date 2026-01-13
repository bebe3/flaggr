// Map constants
export const MAP_CONFIG = {
  initialCenter: {
    longitude: 138,
    latitude: 36,
  },
  initialZoom: 2.1,
  listClickZoom: 2.4,
  minZoom: 2.1,
  mobileMinZoom: 1,
  maxZoom: 6,
  fitBoundsMaxZoom: 4,
  fitBoundsPadding: 100,
  animationDuration: 1000,
} as const;

// Hover label constants
export const HOVER_LABEL = {
  width: 176, // w-44 = 11rem = 176px
  minTop: 80,
  yOffset: 200,
  xOffset: 20,
  desktopYOffset: 80,
} as const;

// Resizable panel constants
export const PANEL_SIZES = {
  defaultWidth: '280px',
  minWidth: '260px',
  maxWidth: '480px',
} as const;

// Mobile drawer constants
export const DRAWER_CONFIG = {
  height: '70vh',
  maxHeight: '90vh',
} as const;

// FAB button constants
export const FAB_CONFIG = {
  size: 'h-12 w-12',
  position: 'left-4 top-18',
} as const;
