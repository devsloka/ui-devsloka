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
    image: "/images/ai-agent-template-demo.png",
    tags: ["AI Agent", "Chatbot", "Landing Page"],
    category: "landing-page",
    isPro: false,
    href: "https://ai-agent-template-wkwu.vercel.app/",
    github: "https://github.com/yashraj970/AI-Agent-Template",
  },
  {
    id: "template-2",
    title: "Devspro Portfolio Template",
    description:
      "A responsive portfolio template for web developers and designers.",
    image: "/images/devspro-portfolio.png",
    tags: ["Portfolio", "Developer", "Designer"],
    category: "portfolio",
    isPro: false,
    href: "https://portfolio-devsloka.vercel.app",
    github: "https://github.com/PriyanshuGupta28/portfolio-devsloka",
  },
  {
    id: "template-3",
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
];
