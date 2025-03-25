
export default function ParticleBackground() {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="stars">
          {Array.from({ length: 100 }).map((_, i) => {
            const size = 1 + Math.random() * 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = 3 + Math.random() * 7;
            const delay = Math.random() * -10;
  
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${x}%`,
                  top: `${y}%`,
                  animation: `twinkle ${duration}s ${delay}s ease-in-out infinite`,
                  opacity: 0.2 + Math.random() * 0.8,
                }}
              />
            );
          })}
        </div>
        <style jsx global>{`
          @keyframes twinkle {
            0%,
            100% {
              opacity: 0.2;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.3);
            }
          }
        `}</style>
      </div>
    );
  }