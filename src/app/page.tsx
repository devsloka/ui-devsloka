import { defaultSEO } from "@/config/seo/seo.config";
import { generateSEO } from "@/config/seo/seo.utils";

export const metadata = generateSEO({
  title:
    "Devsloka UI | Premium Components , Blocks and Templates For React.js , Next.js , Remix.js and React-Router-Dom v7.0.0",
  description:
    defaultSEO.description ??
    "Premium Components , Blocks and Templates For React.js , Next.js , Remix.js and React-Router-Dom v7.0.0",
  image: "/og-home.jpg",
});

export default function Home() {
  return (
    <>
      <div>Devsloka UI</div>
    </>
  );
}
