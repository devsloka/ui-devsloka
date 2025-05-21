import { useOnlineStatus } from "@/hooks/devsloka-hooks/use-online-status";
import { useScrollPosition } from "@/hooks/devsloka-hooks/use-scroll-position";
import UseFetchDemo from "@/hooks/devsloka-hooks/demo/use-fetch-demo";
import UseClipboardDemo from "@/hooks/devsloka-hooks/demo/use-clipboard-demo";
import UseDeviceDetectionDemo from "@/hooks/devsloka-hooks/demo/use-device-detection-demo";
import UseFormDemo from "@/hooks/devsloka-hooks/demo/use-form-demo";
import UseKeyPressDemo from "@/hooks/devsloka-hooks/demo/use-key-press-demo";
import UseDateFormatterDemo from "@/hooks/devsloka-hooks/demo/use-date-formatter-demo";
import UseDebounceDemo from "@/hooks/devsloka-hooks/demo/use-debounce-demo";

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
      secondaryTitle:
        "Copy source code and paste it in hooks/devsloka-hooks folder",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/devsloka-hooks/use-fetch.tsx",
    },
  },
  "use-debounce": {
    component: UseDebounceDemo,
    codeMetadata: {
      title: "useDebounce Hook",
      description: "Debounce values for performance optimization",
      keywords: ["React", "Debounce", "Performance"],
      language: "tsx",
      secondaryTitle:
        "Copy source code and paste it in hooks/devsloka-hooks folder",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/devsloka-hooks/use-debounce.tsx",
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
  "use-clipboard": {
    component: UseClipboardDemo,
    codeMetadata: {
      title: "useClipboard Hook",
      description: "Copy text to clipboard with feedback state",
      keywords: ["React", "Clipboard", "Browser API"],
      language: "tsx",
      secondaryTitle:
        "Copy source code and paste it in hooks/devsloka-hooks folder",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/devsloka-hooks/use-clipboard.tsx",
    },
  },
  "use-online-status": {
    component: useOnlineStatus,
    codeMetadata: {
      title: "useOnlineStatus Hook",
      description: "Detect browser connectivity status",
      keywords: ["React", "Network", "Browser API"],
      language: "tsx",
      secondaryTitle:
        "Copy source code and paste it in hooks/devsloka-hooks folder",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/devsloka-hooks/use-online-status.tsx",
    },
  },
  "use-device-detection": {
    component: UseDeviceDetectionDemo,
    codeMetadata: {
      title: "useDeviceDetection Hook",
      description: "Detect mobile/desktop devices using user agent",
      keywords: ["React", "Device", "Responsive"],
      language: "tsx",
      secondaryTitle:
        "Copy source code and paste it in hooks/devsloka-hooks folder",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/devsloka-hooks/use-device-detection.tsx",
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
      secondaryTitle:
        "Copy source code and paste it in hooks/devsloka-hooks folder",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/devsloka-hooks/use-form.tsx",
    },
  },
  "use-key-press": {
    component: UseKeyPressDemo,
    codeMetadata: {
      title: "useKeyPress Hook",
      description: "Detect keyboard key presses",
      keywords: ["React", "Keyboard", "Interaction"],
      language: "tsx",
      secondaryTitle:
        "Copy source code and paste it in hooks/devsloka-hooks folder",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/devsloka-hooks/use-key-press.tsx",
    },
  },
  "use-scroll-position": {
    component: useScrollPosition,
    codeMetadata: {
      title: "useScrollPosition Hook",
      description: "Track scroll position in viewport",
      keywords: ["React", "Scroll", "Position"],
      language: "tsx",
      secondaryTitle:
        "Copy source code and paste it in hooks/devsloka-hooks folder",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/devsloka-hooks/use-scroll-position.tsx",
    },
  },
  "use-date-formatter": {
    component: UseDateFormatterDemo,
    codeMetadata: {
      title: "useDateFormatter Hook",
      description: "Localized date formatting with Intl API",
      keywords: ["React", "Dates", "Localization"],
      language: "tsx",
      secondaryTitle:
        "Copy source code and paste it in hooks/devsloka-hooks folder",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/devsloka-hooks/use-date-formatter.tsx",
    },
  },
};
