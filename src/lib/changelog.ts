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
    id: "2026-10-13",
    date: "October 13, 2026",
    dateTime: "2026-10-13",
    label: "Components",
    title: "Fourteen new components, and smoother motion everywhere.",
    summary:
      "Cards, carousels, galleries, bento grids and a cast of fuzzy mascots, plus a motion pass across the library. New components carry a New tag in the sidebar and on the components page.",
    changes: [
      {
        type: "New",
        title: "Fuzzy Mascot",
        description:
          "Plush characters in 20 shapes, from clover and ghost to a glass orb, a visor bot, a strawberry, a mango and a Devsloka mascot with the logo’s ring as its eye, all following your cursor. Idle, working and sleeping states, six shadings, hats, glasses and adjustable fur. Click one to watch it spin.",
        link: { label: "Meet the mascots", href: "/components/fuzzy-mascot" },
      },
      {
        type: "New",
        title: "Three animated bento grids",
        description:
          "Bento Grid, Showcase Bento and Mission Bento: flowing file lists, drifting marquees, count-up stats, rotating testimonials and a self-drawing trend arrow. Each lays out by its own width with container queries.",
        link: { label: "See Bento Grid", href: "/components/bento-grid" },
      },
      {
        type: "New",
        title: "Profile, availability and reminders cards",
        description:
          "Profile Card with a live pixel cover and cursor trail, Availability Card with a ticking local clock and copy-email, and Reminders Card with animated checkboxes and inline add.",
        link: { label: "See Profile Card", href: "/components/profile-card" },
      },
      {
        type: "New",
        title: "Receipt Printer and Now Playing Card",
        description:
          "A torn-edge receipt that prints line by line and tears off to reset, and a music widget whose album art spins as a vinyl disc before opening into the full cover.",
        link: { label: "Print a receipt", href: "/components/receipt-printer" },
      },
      {
        type: "New",
        title: "Carousels and galleries",
        description:
          "Team Carousel (an infinite Embla strip that pauses on hover), Case Study Carousel with peeking neighbours, Dock Gallery with macOS-style magnification, and Hover Expand Gallery.",
        link: { label: "Try Dock Gallery", href: "/components/dock-gallery" },
      },
      {
        type: "New",
        title: "Arc Scroll Steps",
        description:
          "A scroll-driven stepper: numbered steps orbit a large arc and the active step’s title swaps in as you scroll, with snap points and click-to-jump.",
        link: { label: "Scroll the steps", href: "/components/arc-scroll-steps" },
      },
      {
        type: "Improved",
        title: "Smoother, calmer motion",
        description:
          "A library-wide animation audit: selection controls no longer wiggle on every arrow key, active indicators settle in 300ms, tabs cross-fade without double images, and the text effect, tour, carousel, expanding cards and multi-select all move more naturally.",
        link: { label: "Feel the tabs", href: "/components/tabs-switcher" },
      },
      {
        type: "Improved",
        title: "Small touches around the site",
        description:
          "A pixel trail follows your cursor across the homepage hero, the feedback button is quieter and works by keyboard and touch, and contact links now point to devsloka.in/contact.",
        link: { label: "Visit the homepage", href: "/" },
      },
    ],
  },
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
