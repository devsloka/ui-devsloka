import AnimatedMacBook from "@/components/ui/laptop-closes-on-scroll";

export default function AnimatedLaptopDemo() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="py-20 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            Scroll to Experience
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            A hyper-realistic MacBook that responds to your scroll. Try it now.
          </p>
        </div>

        <AnimatedMacBook
          screenContent="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          color="space-gray"
          scale={0.9}
          sensitivity={0.7}
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
