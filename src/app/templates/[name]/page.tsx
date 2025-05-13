import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart,
  CheckCircle2,
  ExternalLink,
  Shield,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { getTemplateData } from "@/utilities/template.utils";
import { generateSEO } from "@/config/seo/seo.utils";
import Link from "next/link";

// Pre-generate the list of template names for static builds
export async function generateStaticParams() {
  const templateNames = await Promise.resolve([
    "ai-agent-template",
    "e-commerce-store",
  ]);

  return templateNames.map((id) => ({ name: id }));
}

// Generate SEO metadata based on the template
export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const template = getTemplateData(name);
  if (!template) return {};

  return generateSEO({
    title: `${template.seo.title} - Devsloka Templates`,
    description: template.seo.description,
    path: `templates/${name}`,
    image: `/images/${name}.png`,
    keywords: [template.seo.keywords, "Devsloka", "AI Templates"],
  });
}

// Main page component
export default async function TemplatePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const template = getTemplateData(name);
  if (!template) notFound();

  const { heroContent, benefits, features, dependencies, seo } = template;

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {heroContent.title}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {heroContent.subtitle}
            </p>
          </div>

          {/* Dynamic Media Section */}
          <div className="mt-8 overflow-hidden rounded-lg border shadow-md relative aspect-video">
            <video
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover z-0"
              poster={`https://source.unsplash.com/random/1920x1080/?${name},ai`}
            >
              <source src={heroContent.videoUrl} type="video/mp4" />
              <Image
                src={`https://source.unsplash.com/random/1920x1080/?${name},technology`}
                alt={heroContent.title}
                fill
                className="object-cover"
                priority
              />
            </video>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href={heroContent.ctaLink || "#"} target="_blank">
              <Button size="lg" className="gap-2">
                {heroContent.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={heroContent.ctaPreview || "#"} target="_blank">
              <Button size="lg" variant="outline" className="gap-2">
                Live Preview
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Template Details */}
        <section className="container space-y-24 py-20">
          {/* Overview */}
          <div>
            <h2 className="mb-6 text-3xl font-bold">Template Overview</h2>
            <div className="rounded-xl border bg-card p-6 shadow-md">
              <p className="text-muted-foreground">{seo.description}</p>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h2 className="mb-6 text-3xl font-bold">Ideal For</h2>
            <div className="rounded-xl border bg-card p-6 shadow-md">
              <p className="text-muted-foreground">
                {heroContent.targetAudience}
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div>
            <h2 className="mb-6 text-3xl font-bold">Key Advantages</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <Card
                  key={benefit.id}
                  className="border-0 bg-gradient-to-br from-card to-muted/30 shadow-md transition-all hover:shadow-lg"
                >
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Core Features */}
          <div>
            <h2 className="mb-6 text-3xl font-bold">Core Features</h2>
            <div className="grid gap-6">
              <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-primary/10 shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{features[0].title}</CardTitle>
                  <CardDescription>{features[0].description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {features[0].subItems?.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-background p-3 shadow-sm"
                      >
                        <p className="text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.slice(1).map((feature) => (
                  <Card
                    key={feature.id}
                    className="border-0 shadow-md transition-all hover:shadow-lg"
                  >
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {feature.id % 3 === 0 ? (
                          <Shield className="h-5 w-5 text-primary" />
                        ) : feature.id % 2 === 0 ? (
                          <BarChart className="h-5 w-5 text-primary" />
                        ) : (
                          <Zap className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="mb-6 text-3xl font-bold">Technology Stack</h2>
            <div className="rounded-xl border bg-card p-6 shadow-md">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {dependencies.map((dep) => (
                  <div
                    key={dep.id}
                    className="rounded-lg border bg-background p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <h3 className="mb-2 font-semibold">{dep.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {dep.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
