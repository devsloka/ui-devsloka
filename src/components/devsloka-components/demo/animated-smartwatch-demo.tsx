import AnimatedSmartwatch from "../animated-smartwatch";

export default function AnimatedSmartwatchDemo() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="py-20 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            Animated Smartwatch
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Watch the smartwatch rotate with realistic reflections and a live
            watch face.
          </p>
        </div>

        <AnimatedSmartwatch
          fixPositionAtCenter={true}
          color="black"
          bandColor="black"
        />

        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            Premium Design
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Meticulously crafted with attention to every detail, from
            reflections to shadows.
          </p>
        </div>
      </div>
    </main>
  );
}
