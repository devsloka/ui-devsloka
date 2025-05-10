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

export async function generateStaticParams() {
  const templateNames = ["ai-agent-template", "e-commerce-store"];

  return await Promise.all(
    templateNames.map(async (name) => {
      return name;
    })
  );
}

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = await params;
  const template = getTemplateData(name);
  if (!template) return {};

  return generateSEO({
    title: `${template.seo.title} - Devsloka Templates`,
    description: template.seo.description,
    path: `templates/${name}`,
    image: `/templates/${name}.png`,
    keywords: [template.seo.keywords, "Devsloka", "AI Templates"],
  });
}

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
            {/* <div className="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-background z-10" /> */}
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
            <Button size="lg" className="gap-2">
              {heroContent.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Live Preview
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Template Details Sections */}
        <section className="container space-y-24 py-20">
          {/* Description Section */}
          <div>
            <h2 className="mb-6 text-3xl font-bold">Template Overview</h2>
            <div className="rounded-xl border bg-card p-6 shadow-md">
              <p className="text-muted-foreground">{seo.description}</p>
            </div>
          </div>

          {/* Use Cases Section */}
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

          {/* Features Section */}
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
                    {features[0].subItems?.map((item, index) => (
                      <div
                        key={index}
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

          {/* Tech Stack Section */}
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
