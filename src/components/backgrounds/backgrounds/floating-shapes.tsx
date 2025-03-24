export default function FloatingShapesBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 to-blue-900 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => {
        const size = 20 + Math.random() * 80;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = 15 + Math.random() * 30;
        const delay = Math.random() * -30;

        return (
          <div
            key={i}
            className="absolute rounded-lg bg-white/10"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${initialX}%`,
              top: `${initialY}%`,
              animation: `float ${duration}s ${delay}s linear infinite`,
              opacity: 0.1 + Math.random() * 0.2,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10%, 10%) rotate(90deg);
          }
          50% {
            transform: translate(0, 20%) rotate(180deg);
          }
          75% {
            transform: translate(-10%, 10%) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
