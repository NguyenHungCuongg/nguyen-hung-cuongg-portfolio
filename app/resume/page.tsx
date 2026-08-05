import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import PdfViewerWrapper from "@/components/resume/PdfViewerWrapper";

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description: `View the resume of ${siteConfig.name}, Software Engineer based in Ho Chi Minh City, Vietnam.`,
  robots: { index: false, follow: false },
};

export default async function ResumePage() {
  // Artificial delay to show the retro loading spinner
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return <PdfViewerWrapper />;
}
