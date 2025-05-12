import { AirbnbListingCard, ListingProps } from "@/components/ui/airbnb-card";

export default function AirbnbListingCardExample() {
  const listings: ListingProps[] = [
    {
      id: "1",
      title: "Modern Loft with Ocean View",
      location: "Malibu, California",
      host: "John",
      images: [
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9vbXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1486946255434-2466348c2166?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      rating: 4.98,
      reviewCount: 153,
      price: 250,
      perNight: true,
      dates: "Nov 12-17",
      isSuperhost: true,
      category: "Beachfront",
    },
  ];

  return (
    <div className="">
      {listings.map((listing) => (
        <AirbnbListingCard key={listing.id} {...listing} />
      ))}
    </div>
  );
}
