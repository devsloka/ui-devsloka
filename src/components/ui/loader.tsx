import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500" />
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.2s] bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400" />
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.4s] bg-gradient-to-br from-cyan-500 to-teal-500 dark:from-cyan-400 dark:to-teal-400" />
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.6s] bg-gradient-to-br from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400" />
      <div className="w-5 h-5 rounded-full mr-4 animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.8s] bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-400" />
    </div>
  );
};

export default Loader;
