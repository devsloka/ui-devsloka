import React, { ReactNode } from "react";

export type BorderGradientIconProps = {
  title: string;
  icon: ReactNode;
  width?: string;
  height?: string;
  iconClassName?: string;
};

export const BorderGradientIcon = ({
  title,
  icon,
  width = "120px",
  height = "120px",
  iconClassName = "",
}: BorderGradientIconProps) => {
  return (
    <div
      className="rounded-[38px] p-[1px]
                 bg-gradient-to-b from-neutral-300 to-background
                 dark:from-[#404040] dark:to-black cursor-pointer"
      style={{ width, height }}
    >
      <div
        className="flex justify-center items-center w-full h-full rounded-[38px]
                   bg-gradient-to-br from-gray-100 to-white
                   dark:from-[#101010] dark:to-[#000000]
                   transition-all duration-300
                   hover:opacity-60 active:opacity-75"
        role="button"
        aria-label={title}
        title={title}
      >
        <div
          className={`text-black dark:text-white flex justify-center items-center ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
