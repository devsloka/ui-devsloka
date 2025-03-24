export default function GradientWaveBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-800 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 left-0 right-0 h-[50vh] bg-white/20"
            style={{
              transform: `translateY(${i * 15}%) rotate(${i % 2 ? -1 : 1}deg)`,
              animation: `wave ${8 + i * 2}s ease-in-out infinite alternate`,
              opacity: 0.1 + i * 0.05,
              borderRadius: "100% 100% 0 0",
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes wave {
          0% {
            transform: translateY(10%) rotate(0deg);
          }
          100% {
            transform: translateY(15%) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}
