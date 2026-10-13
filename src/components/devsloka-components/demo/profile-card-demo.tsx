import Image from "next/image";
import { ProfileCard } from "@/registry/ui/profile-card";

function DevslokaLogo() {
  return (
    <div className="flex size-full items-center justify-center bg-[linear-gradient(to_bottom,#2A2A2A,#0B0B0B)]">
      <Image src="/favicon-dark.png" alt="" width={52} height={52} className="object-contain" />
    </div>
  );
}

export default function ProfileCardDemo() {
  return (
    <ProfileCard
      name="Devsloka"
      handle="@devsloka"
      verified
      avatar={<DevslokaLogo />}
      bio="Animated React components, blocks and backgrounds you copy into your project and own."
      stats={[
        { value: "90+", label: "Components" },
        { value: "12.4K", label: "Followers" },
      ]}
      link={{ href: "https://www.devsloka.in", label: "devsloka.in" }}
      accent="#0A6EFF"
    />
  );
}
