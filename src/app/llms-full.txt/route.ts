import { llmsResponse, renderLlmsFull } from "@/lib/seo-content";

export const dynamic = "force-static";

export function GET() {
  return llmsResponse(renderLlmsFull());
}
