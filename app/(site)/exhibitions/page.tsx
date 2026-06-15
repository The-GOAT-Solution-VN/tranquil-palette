import type { Metadata } from "next";
import { ExhibitionsView } from "@/components/exhibitions/ExhibitionsView";
import { getExhibitions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Exhibitions",
  description: "Open days and shows at Tranquil Palette and beyond.",
};

export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();
  return <ExhibitionsView exhibitions={exhibitions} />;
}
