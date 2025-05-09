export interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  isPro: boolean;
  href?: string;
  github?: string;
}

export const templates: Template[] = [
  {
    id: "template-1",
    title: "AI Agent Template Landing Page",
    description:
      "A responsive landing page template for AI agents and chatbots.",
    image:
      "/images/ai-agent-template-demo.png",
    tags: ["AI Agent", "Chatbot", "Landing Page"],
    category: "landing-page",
    isPro: false,
    href: "https://ai-agent-template-wkwu.vercel.app/",
    github: "https://github.com/yashraj970/AI-Agent-Template",
  },
  {
    id: "template-2",
    title: "E-commerce Store",
    description:
      "Complete e-commerce template with product listings, cart, and checkout.",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
    tags: ["E-commerce", "Store", "Shopping"],
    category: "ecommerce",
    isPro: false,
    href: "https://next-js-ecommerce-template.vercel.app/",
    github: "https://github.com/yashraj970/NextJs-Ecommerce-Template",
  },
  {
    id: "template-8",
    title: "Modern Dashboard",
    description:
      "A sleek dashboard template with analytics, charts, and user management.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["Dashboard", "Analytics", "Admin"],
    category: "dashboard",
    isPro: true,
  },
  {
    id: "template-3",
    title: "Portfolio Site",
    description: "Showcase your work with this elegant portfolio template.",
    image:
      "https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1974&auto=format&fit=crop",
    tags: ["Portfolio", "Creative", "Personal"],
    category: "portfolio",
    isPro: true,
  },
  {
    id: "template-4",
    title: "SaaS Landing Page",
    description:
      "Convert visitors with this high-converting SaaS landing page template.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    tags: ["Landing", "SaaS", "Marketing"],
    category: "landing",
    isPro: true,
  },
  {
    id: "template-5",
    title: "Blog Platform",
    description:
      "Modern blog template with categories, comments, and author profiles.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    tags: ["Blog", "Content", "Publishing"],
    category: "blog",
    isPro: true,
  },
  {
    id: "template-6",
    title: "Authentication Pages",
    description:
      "Complete auth flow with login, signup, password reset, and profile pages.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
    tags: ["Auth", "Login", "User"],
    category: "auth",
    isPro: true,
  },
  {
    id: "template-7",
    title: "Marketing Site",
    description:
      "Promote your product with this conversion-focused marketing template.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    tags: ["Marketing", "Landing", "Conversion"],
    category: "marketing",
    isPro: true,
  },
];
