export type BlockData = {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  codeMetadata: {
    description: string;
    keywords: string[];
  };
};

const blocks: Record<string, BlockData> = {
  "pricing-block": {
    name: "pricing-block",
    title: "Pricing Block",
    description: "A customizable pricing component for your application.",
    imageUrl: "https://yourwebsite.com/images/pricing-block.jpg",
    codeMetadata: {
      description: "A block to display various pricing plans.",
      keywords: ["pricing", "plans", "subscriptions"],
    },
  },
};

export { blocks };
