import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { templates } from "@/lib/templates";
import Spotlight from "@/components/templates/spotlight-background";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Spotlight
        className="-top-40 left-0 md:-top-10 md:left-60"
        fill="white"
      />
      {/* <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">Devsloka UI</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#"
                className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
              >
                Templates
              </Link>
              <Link
                href="#"
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                Components
              </Link>
              <Link
                href="#"
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                Documentation
              </Link>
              <Link
                href="#"
                className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
              >
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button size="sm" className="h-8 gap-1">
                Get Pro <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </nav>
          </div>
        </div>
      </header> */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Premium Templates
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Beautiful UI Templates
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Professionally designed templates to accelerate your workflow.
                  Ready to use in your projects.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">Browse All Templates</Button>
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-5" />

          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to elevate your projects?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get unlimited access to all premium templates and future
                  updates with a Pro subscription.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1">
                  Get Pro Access <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Premium UI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
