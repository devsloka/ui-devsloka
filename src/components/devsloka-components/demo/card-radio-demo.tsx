import { CardRadioGroup, CardRadioItem } from "@/registry/ui/card-radio";

const plans = [
  { value: "starter", title: "Starter", description: "For individuals and side projects", price: "$9/mo" },
  { value: "pro", title: "Pro", description: "For growing teams that ship weekly", price: "$19/mo" },
  { value: "enterprise", title: "Enterprise", description: "SSO, audit logs and priority support", price: "$49/mo" },
];

const CardRadioDemo = () => {
  return (
    <CardRadioGroup
      defaultValue="pro"
      orientation="horizontal"
      aria-label="Plan"
      className="w-full max-w-2xl"
    >
      {plans.map((plan) => (
        <CardRadioItem
          key={plan.value}
          value={plan.value}
          title={plan.title}
          description={plan.description}
          aside={plan.price}
        />
      ))}
    </CardRadioGroup>
  );
};

export default CardRadioDemo;
