import ProductCard from "@/components/ui/product-card";

export function ProductCardDemo() {
  return (
    <div className="px-4">
      <ProductCard
        id={1}
        image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop"
        title="Nike Air Force 1"
        price={89.99}
        originalPrice={99.99}
        category="Shoes"
        rating={4.5}
        inStock={true}
        isNew={true}
        isFeatured={true}
        discount={10}
        colors={["red", "blue", "white"]}
      />
    </div>
  );
}
