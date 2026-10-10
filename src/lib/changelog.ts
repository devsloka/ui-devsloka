export type ChangelogEntry = {
  id: string;
  date: string;
  dateTime: string;
  label: string;
  title: string;
  summary: string;
  changes: {
    type: "New" | "Improved";
    title: string;
    description: string;
    link?: { label: string; href: string };
  }[];
  announcement?: { label: string; href: string };
};

// Newest first. Keep release dates fixed so the archive stays accurate.
export const CHANGELOG: ChangelogEntry[] = [
  {
    id: "2026-10-11",
    date: "October 11, 2026",
    dateTime: "2026-10-11",
    label: "UI update",
    title: "A new chapter for Devsloka UI.",
    summary:
      "A refreshed home for the library, more blocks for real pages, and a consistent Devsloka blue across the latest designs. Here’s what’s changed since our first release.",
    changes: [
      {
        type: "Improved",
        title: "A redesigned homepage",
        description:
          "Live component previews, a filterable library index, and an interactive text-effect playground make it easier to find and try your next component.",
        link: { label: "Explore the homepage", href: "/" },
      },
      {
        type: "New",
        title: "More blocks to build with",
        description:
          "Changelog, blog, and call-to-action layouts join sign-in, sign-up, password recovery, OTP, and 404 screens, with multiple variants to choose from.",
        link: { label: "Browse blocks", href: "/blocks" },
      },
      {
        type: "Improved",
        title: "Devsloka blue, throughout",
        description:
          "The latest blocks use our signature blue for buttons, panels, illustrations, and selected states. Colour props let you adapt them to your own brand.",
        link: { label: "Preview the sign-in blocks", href: "/blocks/sign-in" },
      },
      {
        type: "Improved",
        title: "Find it. Install it. Make it yours.",
        description:
          "Browse components, backgrounds, and hooks from the library. Use the shadcn CLI or copy the source into your project and take it from there.",
        link: { label: "Read the installation guide", href: "/installation" },
      },
      {
        type: "New",
        title: "A home for release notes",
        description:
          "This changelog keeps the launch and subsequent updates in one place, with dated notes and links to what’s changed.",
      },
    ],
  },
  {
    id: "2025-05-21",
    date: "May 21, 2025",
    dateTime: "2025-05-21",
    label: "Initial release",
    title: "Hello, Devsloka UI.",
    summary:
      "The first version of Devsloka UI went live: the beginning of our library of animated UI components for building interfaces.",
    changes: [
      {
        type: "New",
        title: "The first release",
        description:
          "We shared Devsloka UI with the community and started building the library you see today.",
      },
    ],
    announcement: {
      label: "Read the original launch announcement",
      href: "https://x.com/devsloka/status/1925188390149923023",
    },
  },
];
