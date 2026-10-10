import { ProductCard } from "@/registry/ui/product-card";

export function ProductCardDemo() {
  return (
    <ProductCard
      image={{
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
        alt: "Plain white crew-neck t-shirt",
      }}
      title="Essential Cotton Tee"
      category="Apparel"
      price="$29.00"
      compareAtPrice="$35.00"
      rating={4.6}
      reviewCount={212}
      badges={["New", "-17%"]}
      colors={[
        { name: "White", value: "#f5f5f4" },
        { name: "Black", value: "#1c1917" },
        { name: "Sage", value: "#9caf88" },
      ]}
      stockNote="Free shipping"
    />
  );
}
