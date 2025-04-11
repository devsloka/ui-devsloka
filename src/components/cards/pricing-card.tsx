import React from "react";
import { Check } from "lucide-react";

function PricingCard({
  plan = "Standard Plan",
  price = "$9.99",
  features = [
    "Unlimited transfers",
    "Transaction history with export options",
    "Priority email support",
    "Expanded currency support",
    "Advanced security features",
  ],
  isPopular = true,
}: {
  plan: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}) {
  return (
    <div
      className={`relative bg-card/20 backdrop-blur-2xl rounded-3xl p-8 flex flex-col h-full border shadow-2xl
        ${isPopular ? "border-primary/20" : "border-border/5"}`}
    >
      <div className="mb-8">
        <p className="text-muted-foreground mb-2">{plan}</p>
        <h2 className="text-4xl font-bold text-foreground flex items-end gap-2">
          {price}
          {price !== "Free" && (
            <span className="text-xl text-muted-foreground">/m</span>
          )}
        </h2>
      </div>

      <div className="flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 rounded-full p-1">
              <Check size={16} className="text-foreground" />
            </div>
            <span className="text-muted-foreground text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`mt-8 py-4 px-6 rounded-full text-sm font-medium transition-all
            ${
              isPopular
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
      >
        Get Started
      </button>
    </div>
  );
}

export default PricingCard;
