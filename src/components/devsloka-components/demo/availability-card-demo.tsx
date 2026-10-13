import { AvailabilityCard } from "@/registry/ui/availability-card";

export default function AvailabilityCardDemo() {
  return (
    <AvailabilityCard
      name="Priyanshu Gupta"
      role="Software Engineer"
      avatar={{
        src: "https://avatars.githubusercontent.com/u/112753528?s=400&u=2f2b40146acc1f1cdbb6cb5ef97718c31ac7e5b7&v=4",
        alt: "Portrait of Priyanshu Gupta",
      }}
      timeZone="Asia/Kolkata"
      hireHref="https://www.devsloka.in/contact"
      email="hello@devsloka.in"
      note="Currently High on Creativity"
    />
  );
}
