import { useOnlineStatus } from "@/hooks/devsloka-hooks/use-online-status";
import { useScrollPosition } from "@/hooks/devsloka-hooks/use-scroll-position";
import UseFetchDemo from "@/hooks/devsloka-hooks/demo/use-fetch-demo";
import UseClipboardDemo from "@/hooks/devsloka-hooks/demo/useClipboardDemo";
import UseDeviceDetectionDemo from "@/hooks/devsloka-hooks/demo/useDeviceDetectionDemo";
import UseFormDemo from "@/hooks/devsloka-hooks/demo/useFormDemo";
import UseKeyPressDemo from "@/hooks/devsloka-hooks/demo/UseKeyPressDemo";
import UseDateFormatterDemo from "@/hooks/devsloka-hooks/demo/useDateFormatterDemo";
import UseDebounceDemo from "@/hooks/devsloka-hooks/demo/useDebounceDemo";

export type UtilityMeta = {
  component: React.FC;
  codeMetadata: {
    title: string;
    description: string;
    keywords: string[];
    language: string;
    dependencies?: string;
    secondaryCode?: string;
    secondaryTitle?: string;
    secondaryLanguage?: string;
    secondaryDescription?: string;
  };
};

export const utilities: Record<string, UtilityMeta> = {
  // "use-local-storage": {
  //   component: useLocalStorage,
  //   codeMetadata: {
  //     title: "useLocalStorage Hook",
  //     description:
  //       "Persist state in localStorage with automatic synchronization",
  //     keywords: ["React", "localStorage", "State Management"],
  //     language: "tsx",
  //     secondaryCode: getComponentCode("src/utilities/use-local-storage.ts"),
  //     secondaryTitle: "Implementation",
  //     secondaryLanguage: "tsx",
  //   },
  // },
  "use-fetch": {
    component: UseFetchDemo,
    codeMetadata: {
      title: "useFetch Hook",
      description: "Data fetching hook with loading/error states",
      keywords: ["React", "API", "Data Fetching"],
      language: "tsx",
      dependencies: "npm i axios", // If using axios
      secondaryTitle: "useFetch Hook",
      secondaryLanguage: "tsx",
    },
  },
  "use-debounce": {
    component: UseDebounceDemo,
    codeMetadata: {
      title: "useDebounce Hook",
      description: "Debounce values for performance optimization",
      keywords: ["React", "Debounce", "Performance"],
      language: "tsx",
      secondaryTitle: "useDebounce Hook",
      secondaryLanguage: "tsx",
    },
  },
  // "use-on-click-outside": {
  //   component: useOnClickOutside,
  //   codeMetadata: {
  //     title: "useOnClickOutside Hook",
  //     description: "Detect clicks outside a specified element",
  //     keywords: ["React", "DOM", "Interaction"],
  //     language: "tsx",
  //   },
  // },
  // Add remaining utilities following the same pattern
  "use-clipboard": {
    component: UseClipboardDemo,
    codeMetadata: {
      title: "useClipboard Hook",
      description: "Copy text to clipboard with feedback state",
      keywords: ["React", "Clipboard", "Browser API"],
      language: "tsx",
      secondaryTitle: "useClipboard Hook",
      secondaryLanguage: "tsx",
    },
  },
  "use-online-status": {
    component: useOnlineStatus,
    codeMetadata: {
      title: "useOnlineStatus Hook",
      description: "Detect browser connectivity status",
      keywords: ["React", "Network", "Browser API"],
      language: "tsx",
      secondaryTitle: "useOnlineStatus Hook",
      secondaryLanguage: "tsx",
    },
  },
  // "use-dark-mode": {
  //   component: useDarkMode,
  //   codeMetadata: {
  //     title: "useDarkMode Hook",
  //     description: "Manage dark/light theme with CSS class synchronization",
  //     keywords: ["React", "Theming", "UI"],
  //     language: "tsx",
  //   },
  // },
  "use-device-detection": {
    component: UseDeviceDetectionDemo,
    codeMetadata: {
      title: "useDeviceDetection Hook",
      description: "Detect mobile/desktop devices using user agent",
      keywords: ["React", "Device", "Responsive"],
      language: "tsx",
      secondaryTitle: "useDeviceDetection Hook",
      secondaryLanguage: "tsx",
    },
  },
  // "use-hover": {
  //   component: useHover,
  //   codeMetadata: {
  //     title: "useHover Hook",
  //     description: "Detect hover state on elements",
  //     keywords: ["React", "Hover", "Interaction"],
  //     language: "tsx",
  //   },
  // },
  // "use-window-size": {
  //   component: useWindowSize,
  //   codeMetadata: {
  //     title: "useWindowSize Hook",
  //     description: "Track window dimensions changes",
  //     keywords: ["React", "Responsive", "Window"],
  //     language: "tsx",
  //   },
  // },
  "use-form": {
    component: UseFormDemo,
    codeMetadata: {
      title: "useForm Hook",
      description: "Manage form state with validation",
      keywords: ["React", "Forms", "Validation"],
      language: "tsx",
      secondaryTitle: "useForm Hook",
      secondaryLanguage: "tsx",
    },
  },
  "use-key-press": {
    component: UseKeyPressDemo,
    codeMetadata: {
      title: "useKeyPress Hook",
      description: "Detect keyboard key presses",
      keywords: ["React", "Keyboard", "Interaction"],
      language: "tsx",
      secondaryTitle: "useKeyPress Hook",
    },
  },
  "use-scroll-position": {
    component: useScrollPosition,
    codeMetadata: {
      title: "useScrollPosition Hook",
      description: "Track scroll position in viewport",
      keywords: ["React", "Scroll", "Position"],
      language: "tsx",
      secondaryTitle: "useScrollPosition Hook",
    },
  },
  // "use-animation": {
  //   component: useAnimation,
  //   codeMetadata: {
  //     title: "useAnimation Hook",
  //     description: "Control CSS animations timing",
  //     keywords: ["React", "Animation", "CSS"],
  //     language: "tsx",
  //   },
  // },
  // "use-previous": {
  //   component: usePrevious,
  //   codeMetadata: {
  //     title: "usePrevious Hook",
  //     description: "Track previous state/props values",
  //     keywords: ["React", "State", "Comparison"],
  //     language: "tsx",
  //   },
  // },
  "use-date-formatter": {
    component: UseDateFormatterDemo,
    codeMetadata: {
      title: "useDateFormatter Hook",
      description: "Localized date formatting with Intl API",
      keywords: ["React", "Dates", "Localization"],
      language: "tsx",
      secondaryTitle: "useDateFormatter Hook",
      secondaryLanguage: "tsx",
    },
  },
};
