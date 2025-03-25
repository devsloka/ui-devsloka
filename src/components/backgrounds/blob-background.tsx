export default function BlobBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 overflow-hidden">
      <div className="blobs">
        {Array.from({ length: 5 }).map((_, i) => {
          const hue = (i * 40) % 360;
          return (
            <div
              key={i}
              className="blob"
              style={{
                background: `radial-gradient(circle at center, hsla(${hue}, 100%, 70%, 0.3), hsla(${
                  hue + 20
                }, 100%, 60%, 0.1))`,
                animation: `blob-move-${i + 1} 20s ease-in-out infinite`,
                animationDelay: `${i * -4}s`,
              }}
            />
          );
        })}
      </div>
      <style jsx global>{`
        .blobs {
          position: absolute;
          inset: 0;
          filter: blur(40px);
          mix-blend-mode: soft-light;
        }

        .blob {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          transform-origin: center center;
        }

        @keyframes blob-move-1 {
          0%,
          100% {
            transform: translate(-20%, -20%) scale(1);
          }
          25% {
            transform: translate(10%, 10%) scale(1.2);
          }
          50% {
            transform: translate(30%, -10%) scale(0.8);
          }
          75% {
            transform: translate(0%, 20%) scale(1.1);
          }
        }

        @keyframes blob-move-2 {
          0%,
          100% {
            transform: translate(20%, 20%) scale(1.1);
          }
          25% {
            transform: translate(-10%, 10%) scale(0.9);
          }
          50% {
            transform: translate(-30%, -10%) scale(1.2);
          }
          75% {
            transform: translate(10%, -20%) scale(0.8);
          }
        }

        @keyframes blob-move-3 {
          0%,
          100% {
            transform: translate(0%, -30%) scale(0.9);
          }
          25% {
            transform: translate(20%, 0%) scale(1.1);
          }
          50% {
            transform: translate(-20%, 30%) scale(0.8);
          }
          75% {
            transform: translate(-10%, -10%) scale(1.2);
          }
        }

        @keyframes blob-move-4 {
          0%,
          100% {
            transform: translate(-30%, 10%) scale(1.2);
          }
          25% {
            transform: translate(0%, -20%) scale(0.8);
          }
          50% {
            transform: translate(30%, 0%) scale(1.1);
          }
          75% {
            transform: translate(-10%, 30%) scale(0.9);
          }
        }

        @keyframes blob-move-5 {
          0%,
          100% {
            transform: translate(10%, 30%) scale(0.8);
          }
          25% {
            transform: translate(-30%, -10%) scale(1.1);
          }
          50% {
            transform: translate(10%, -30%) scale(0.9);
          }
          75% {
            transform: translate(30%, 10%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
