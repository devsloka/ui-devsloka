const templates = {
  "ai-agent-template": {
    seo: {
      title: "AI Agent Landing Page Template",
      description:
        "Professional landing page template for AI startups with modern design and animations.",
      keywords: [
        "AI template",
        "landing page",
        "Next.js",
        "Tailwind CSS",
        "startup",
      ],
    },
    heroContent: {
      title: "AI Agent Template",
      subtitle: "The ultimate landing page template for your AI agent startup.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      ctaPrimary: "Get Template",
      targetAudience: [
        "You are launching a new AI agent startup and need a professional, eye-catching landing page to showcase your product's features.",
        "You are a seasoned entrepreneur and want to create a landing page that captures the attention of potential customers.",
        "You are a seasoned entrepreneur and want to create a landing page that captures the attention of potential customers.",
        "You are a seasoned entrepreneur and want to create a landing page that captures the attention of potential customers.",
      ],
    },
    benefits: [
      {
        id: 1,
        title: "Save 500+ hours of work",
        description:
          "Skip the design and development process and get straight to customizing your AI agent landing page.",
      },
      {
        id: 2,
        title: "Save 500+ hours of work",
        description:
          "Skip the design and development process and get straight to customizing your AI agent landing page.",
      },
      {
        id: 3,
        title: "Save 500+ hours of work",
        description:
          "Skip the design and development process and get straight to customizing your AI agent landing page.",
      },
      {
        id: 4,
        title: "Save 500+ hours of work",
        description:
          "Skip the design and development process and get straight to customizing your AI agent landing page.",
      },
      {
        id: 5,
        title: "Save 500+ hours of work",
        description:
          "Skip the design and development process and get straight to customizing your AI agent landing page.",
      },
      {
        id: 6,
        title: "Save 500+ hours of work",
        description:
          "Skip the design and development process and get straight to customizing your AI agent landing page.",
      },
    ],
    features: [
      {
        id: 1,
        title: "Complete Landing Page",
        description:
          "A comprehensive landing page with 9 carefully designed sections",
        subItems: [
          "Header Section - Professional navigation with theme toggle",
          "Header Section - Professional navigation with theme toggle",
          "Header Section - Professional navigation with theme toggle",
          "Header Section - Professional navigation with theme toggle",
          "Header Section - Professional navigation with theme toggle",
          "Header Section - Professional navigation with theme toggle",
          "Header Section - Professional navigation with theme toggle",
          "Header Section - Professional navigation with theme toggle",
          "Header Section - Professional navigation with theme toggle",
          "Header Section - Professional navigation with theme toggle",
        ],
      },
    ],
    dependencies: [
      {
        id: 1,
        name: "Next.js 15.2.2",
        description: "The React framework for production",
      },
      {
        id: 2,
        name: "Next.js 15.2.2",
        description: "The React framework for production",
      },
      {
        id: 3,
        name: "Tailwind CSS 3.0",
        description: "Utility-first CSS framework for rapid UI development",
      },
      {
        id: 4,
        name: "React 18.2.0",
        description: "The JavaScript library for building user interfaces",
      },
      {
        id: 5,
        name: "Framer Motion",
        description: "Animation library for React",
      },
      {
        id: 6,
        name: "React Icons",
        description: "Icon library for React",
      },
    ],
  },
  "e-commerce-store": {
    seo: {
      title: "E-commerce Store Template",
      description:
        "E commerce store template with modern design and animations.",
      keywords: ["ML template", "machine learning", "data science", "Next.js"],
    },
    heroContent: {
      title: "E-commerce Store Template",
      subtitle: "E commerce store template with modern design and animations.",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      ctaPrimary: "Download Now",
      targetAudience:
        "Data scientists and developers looking to kickstart machine learning projects with proper infrastructure",
    },
    benefits: [
      {
        id: 1,
        title: "Pre-built ML Pipelines",
        description:
          "Jumpstart your project with optimized data processing workflows",
      },
      {
        id: 2,
        title: "Model Training Setup",
        description: "Complete configuration for distributed model training",
      },
      // ... ML-specific benefits
    ],
    features: [
      {
        id: 1,
        title: "Model Training Setup",
        description: "Complete configuration for distributed model training",
        subItems: ["Data preprocessing pipelines"],
      },
      {
        id: 2,
        title: "Model Training Setup",
        description: "Complete configuration for distributed model training",
        subItems: ["Data preprocessing pipelines"],
      },
      {
        id: 3,
        title: "Model Training Setup",
        description: "Complete configuration for distributed model training",
        subItems: ["Data preprocessing pipelines"],
      },
      {
        id: 4,
        title: "Model Training Setup",
        description: "Complete configuration for distributed model training",
        subItems: ["Data preprocessing pipelines"],
      },
    ],
    dependencies: [
      {
        id: 1,
        name: "PyTorch 2.0",
        description: "Machine learning framework for deep learning",
      },
      {
        id: 2,
        name: "Next.js 15.2.2",
        description: "The React framework for production",
      },
      {
        id: 3,
        name: "Tailwind CSS 3.0",
        description: "Utility-first CSS framework for rapid UI development",
      },
      {
        id: 4,
        name: "React 18.2.0",
        description: "The JavaScript library for building user interfaces",
      },
      {
        id: 5,
        name: "Framer Motion",
        description: "Animation library for React",
      },
      {
        id: 6,
        name: "React Icons",
        description: "Icon library for React",
      },
    ],
  },
};

export function getTemplateData(name: string) {
  const template = templates[name as keyof typeof templates];
  return template
    ? {
        ...template,
        seo: {
          ...template.seo,
          keywords: template.seo.keywords.join(", "),
        },
      }
    : null;
}

export type TemplateData = ReturnType<typeof getTemplateData>;
