import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] bg-primary" />
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.2s] bg-primary" />
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.4s] bg-primary" />
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.6s] bg-primary" />
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.8s] bg-primary" />
    </div>
  );
};

export default Loader;
