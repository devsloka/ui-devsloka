export default function GridMeshBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-teal-900 overflow-hidden">
      <div className="grid-container">
        <div className="grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="grid-row">
              {Array.from({ length: 20 }).map((_, j) => (
                <div
                  key={j}
                  className="grid-cell"
                  style={{
                    animationDelay: `${(i + j) * 0.1}s`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .grid-container {
          position: absolute;
          inset: -50px;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .grid {
          position: absolute;
          inset: 0;
          transform: rotateX(60deg);
          transform-style: preserve-3d;
        }

        .grid-row {
          display: flex;
          justify-content: center;
          height: 5vh;
        }

        .grid-cell {
          width: 5vh;
          height: 5vh;
          background: rgba(255, 255, 255, 0.1);
          margin: 2px;
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.1;
            transform: translateZ(0);
          }
          50% {
            opacity: 0.3;
            transform: translateZ(20px);
          }
        }
      `}</style>
    </div>
  );
}
