import { ListingCard } from "@/registry/ui/airbnb-card";

const images = [
  {
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop",
    alt: "Bright living room with sofa and large windows",
  },
  {
    src: "https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=1200&auto=format&fit=crop",
    alt: "Bedroom with neutral linens",
  },
  {
    src: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=1200&auto=format&fit=crop",
    alt: "Ocean view from the balcony",
  },
];

export default function AirbnbListingCardExample() {
  return (
    <ListingCard
      className="w-80"
      images={images}
      title="Malibu, California"
      subtitle="Beachfront · Hosted by John"
      meta="Nov 12 – 17"
      rating={4.98}
      reviewCount={153}
      price="$250"
      priceSuffix="night"
      badge="Superhost"
    />
  );
}
