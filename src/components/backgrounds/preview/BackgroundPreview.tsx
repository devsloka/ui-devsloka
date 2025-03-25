import React, { ReactNode } from "react";

interface BackgroundPreviewProps {
  backgroundComponent: ReactNode;
  title: string;
  description: string;
}

const BackgroundPreview: React.FC<BackgroundPreviewProps> = ({
  backgroundComponent,
  title,
  description,
}) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Dynamic Background */}
      {backgroundComponent}

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md mb-4">
            {title}
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BackgroundPreview;
