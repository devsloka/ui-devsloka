import { PricingCard } from "@/registry/ui/pricing-card";

export default function PricingCardDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <PricingCard
        name="Starter"
        description="For individuals getting started."
        price="Free"
        features={["Up to 3 projects", "Basic analytics", "Community support"]}
        ctaLabel="Get started"
        ctaHref="#"
      />
      <PricingCard
        name="Pro"
        description="For growing teams that need more."
        price="$9.99"
        period="/month"
        features={[
          "Unlimited projects",
          "Advanced analytics with export",
          "Priority email support",
          "SSO and audit logs",
        ]}
        ctaLabel="Start free trial"
        ctaHref="#"
        highlighted
        badge="Popular"
      />
    </div>
  );
}
