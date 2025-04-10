"use client";

import React from "react";
import { MorphingNav } from "../morphing-nav";
import { Home, Search, Settings, User } from "lucide-react";

const MorphingNavDemo = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "" },
    { id: "profile", label: "Profile", icon: User, href: "" },
    { id: "settings", label: "Settings", icon: Settings, href: "" },
    { id: "search", label: "Search", icon: Search, href: "" },
  ];
  return (
    <MorphingNav
      items={navItems}
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full flex justify-center"
      itemClassName="px-6 py-3"
      activeClass="bg-primary"
      iconClass="h-6 w-6"
    />
  );
};

export default MorphingNavDemo;
