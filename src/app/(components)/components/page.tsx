import OverviewCard from "@/components/root/OverviewCard";
import React from "react";

const Components = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 ">
      {Array.from({ length: 10 }).map((_, index) => (
        <OverviewCard key={index} />
      ))}
    </div>
  );
};

export default Components;
