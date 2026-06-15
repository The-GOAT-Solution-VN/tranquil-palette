import { Suspense } from "react";
import type { Metadata } from "next";
import { VisitView } from "@/components/visit/VisitView";
import { getSiteContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Visit the gallery",
  description:
    "Tranquil Palette opens its doors by appointment. Write to arrange a quiet afternoon among the paintings.",
};

export default async function VisitPage() {
  const site = await getSiteContent();
  return (
    <Suspense fallback={null}>
      <VisitView site={site} />
    </Suspense>
  );
}
