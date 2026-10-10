import UseAnimationDemo from "@/components/devsloka-components/demo/hooks/use-animation-demo";
import UseClipboardDemo from "@/components/devsloka-components/demo/hooks/use-clipboard-demo";
import UseDarkModeDemo from "@/components/devsloka-components/demo/hooks/use-dark-mode-demo";
import UseDateFormatterDemo from "@/components/devsloka-components/demo/hooks/use-date-formatter-demo";
import UseDebounceDemo from "@/components/devsloka-components/demo/hooks/use-debounce-demo";
import UseDeviceDetectionDemo from "@/components/devsloka-components/demo/hooks/use-device-detection-demo";
import UseFetchDemo from "@/components/devsloka-components/demo/hooks/use-fetch-demo";
import UseFormDemo from "@/components/devsloka-components/demo/hooks/use-form-demo";
import UseHoverDemo from "@/components/devsloka-components/demo/hooks/use-hover-demo";
import UseKeyPressDemo from "@/components/devsloka-components/demo/hooks/use-key-press-demo";
import UseLocalStorageDemo from "@/components/devsloka-components/demo/hooks/use-local-storage-demo";
import UseOnClickOutsideDemo from "@/components/devsloka-components/demo/hooks/use-on-click-outside-demo";
import UseOnlineStatusDemo from "@/components/devsloka-components/demo/hooks/use-online-status-demo";
import UsePreviousDemo from "@/components/devsloka-components/demo/hooks/use-previous-demo";
import UseScrollPositionDemo from "@/components/devsloka-components/demo/hooks/use-scroll-position-demo";
import UseWindowSizeDemo from "@/components/devsloka-components/demo/hooks/use-window-size-demo";

export type UtilityMeta = {
  component: React.FC;
  codeMetadata: {
    title: string;
    description: string;
    keywords: string[];
    language: string;
    secondaryTitle?: string;
    secondaryLanguage?: string;
    secondaryDescription?: string;
  };
};

export const utilities: Record<string, UtilityMeta> = {
  "use-animation": {
    component: UseAnimationDemo,
    codeMetadata: {
      title: "useAnimation",
      description:
        "A boolean flag that switches on when triggered and turns itself off after a set duration, for one-shot CSS animations.",
      keywords: ["React", "Animation", "Timer", "State"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-animation.ts",
    },
  },
  "use-clipboard": {
    component: UseClipboardDemo,
    codeMetadata: {
      title: "useClipboard",
      description:
        "Copy text to the clipboard with a temporary copied state, error handling and a fallback for insecure contexts.",
      keywords: ["React", "Clipboard", "Copy", "Browser API"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-clipboard.ts",
    },
  },
  "use-dark-mode": {
    component: UseDarkModeDemo,
    codeMetadata: {
      title: "useDarkMode",
      description:
        "Toggle a persisted dark class on the document (or a scoped element) that follows the system color scheme until the user chooses.",
      keywords: ["React", "Dark Mode", "Theme", "prefers-color-scheme"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-dark-mode.ts",
    },
  },
  "use-date-formatter": {
    component: UseDateFormatterDemo,
    codeMetadata: {
      title: "useDateFormatter",
      description:
        "Memoized, locale-aware absolute, relative and range date formatting built on the Intl API.",
      keywords: ["React", "Dates", "Intl", "Localization"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-date-formatter.ts",
    },
  },
  "use-debounce": {
    component: UseDebounceDemo,
    codeMetadata: {
      title: "useDebounce",
      description:
        "Debounce a changing value, or a callback with cancel and flush controls.",
      keywords: ["React", "Debounce", "Performance", "Callback"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-debounce.ts",
    },
  },
  "use-device-detection": {
    component: UseDeviceDetectionDemo,
    codeMetadata: {
      title: "useDeviceDetection",
      description:
        "Classify the device as mobile, tablet or desktop from viewport media queries, with pointer and hover capabilities.",
      keywords: ["React", "Device", "Responsive", "Media Query"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-device-detection.ts",
    },
  },
  "use-fetch": {
    component: UseFetchDemo,
    codeMetadata: {
      title: "useFetch",
      description:
        "Fetch data with status, error and refetch, aborting stale requests when the URL changes or the component unmounts.",
      keywords: ["React", "Fetch", "API", "Data Fetching"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-fetch.ts",
    },
  },
  "use-form": {
    component: UseFormDemo,
    codeMetadata: {
      title: "useForm",
      description:
        "Manage typed form values, derived validation errors, touched fields and submission in one hook.",
      keywords: ["React", "Forms", "Validation", "State"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-form.ts",
    },
  },
  "use-hover": {
    component: UseHoverDemo,
    codeMetadata: {
      title: "useHover",
      description:
        "Track whether the pointer is over an element through a callback ref.",
      keywords: ["React", "Hover", "Pointer", "Interaction"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-hover.ts",
    },
  },
  "use-key-press": {
    component: UseKeyPressDemo,
    codeMetadata: {
      title: "useKeyPress",
      description:
        "Detect keys and shortcuts like mod+k, returning whether they are held and optionally calling a handler.",
      keywords: ["React", "Keyboard", "Shortcuts", "Interaction"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-key-press.ts",
    },
  },
  "use-local-storage": {
    component: UseLocalStorageDemo,
    codeMetadata: {
      title: "useLocalStorage",
      description:
        "useState that persists to localStorage as JSON and stays in sync across components and browser tabs.",
      keywords: ["React", "localStorage", "Persistence", "State"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-local-storage.ts",
    },
  },
  "use-on-click-outside": {
    component: UseOnClickOutsideDemo,
    codeMetadata: {
      title: "useOnClickOutside",
      description:
        "Run a handler when a pointer or touch starts outside one or more referenced elements.",
      keywords: ["React", "Click Outside", "DOM", "Interaction"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-on-click-outside.ts",
    },
  },
  "use-online-status": {
    component: UseOnlineStatusDemo,
    codeMetadata: {
      title: "useOnlineStatus",
      description:
        "Read the browser's live online or offline connection status.",
      keywords: ["React", "Network", "Offline", "Browser API"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-online-status.ts",
    },
  },
  "use-previous": {
    component: UsePreviousDemo,
    codeMetadata: {
      title: "usePrevious",
      description: "Return the previous distinct value of a prop or state.",
      keywords: ["React", "State", "Previous Value", "Comparison"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-previous.ts",
    },
  },
  "use-scroll-position": {
    component: UseScrollPositionDemo,
    codeMetadata: {
      title: "useScrollPosition",
      description:
        "Track the scroll offset of the window or a scrollable element.",
      keywords: ["React", "Scroll", "Position", "Viewport"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-scroll-position.ts",
    },
  },
  "use-window-size": {
    component: UseWindowSizeDemo,
    codeMetadata: {
      title: "useWindowSize",
      description: "Track the viewport's width and height as it resizes.",
      keywords: ["React", "Window", "Resize", "Responsive"],
      language: "tsx",
      secondaryTitle: "Hook source",
      secondaryLanguage: "tsx",
      secondaryDescription: "hooks/use-window-size.ts",
    },
  },
};
