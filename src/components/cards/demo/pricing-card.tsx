"use client";

import React from "react";
import PricingCard from "../pricing-card";

export default function PricingCardDemo() {
  return (
    <div>
      <PricingCard
        plan="Standard Plan"
        price="$9.99"
        features={[
          "Unlimited transfers",
          "Transaction history with export options",
          "Priority email support",
          "Expanded currency support",
          "Advanced security features",
        ]}
        isPopular={true}
      />
    </div>
  );
}
