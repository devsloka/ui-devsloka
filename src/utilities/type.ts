export interface TemplateData {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  heroContent: {
    title: string;
    subtitle: string;
    videoUrl: string;
    ctaPrimary: string;
  };
  benefits: Benefit[];
  features: Feature[];
  dependencies: Dependency[];
}

interface Benefit {
  id: number;
  title: string;
  description: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  subItems?: string[];
}

interface Dependency {
  id: number;
  name: string;
  description: string;
}
