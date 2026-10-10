import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_REPOSITORY,
  SITE_URL,
} from "@/config/seo/seo.config";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "Devsloka",
            url: "https://www.devsloka.in",
            logo: `${SITE_URL}/android-chrome-512x512.png`,
            sameAs: [SITE_REPOSITORY, "https://x.com/devsloka_ui"],
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: "en",
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      }}
    />
  );
}

export function LibraryJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "@id": `${SITE_URL}/#library`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        codeRepository: SITE_REPOSITORY,
        license: `${SITE_REPOSITORY}/blob/main/LICENSE`,
        programmingLanguage: ["TypeScript", "JavaScript", "CSS"],
        runtimePlatform: "React 19",
        author: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      }}
    />
  );
}
