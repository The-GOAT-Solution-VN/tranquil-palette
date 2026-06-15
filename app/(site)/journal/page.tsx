import type { Metadata } from "next";
import { JournalView } from "@/components/journal/JournalView";
import { getPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the studio — on seasons, materials, and the moments that become paintings.",
};

export default async function JournalPage() {
  const posts = await getPosts();
  return <JournalView posts={posts} />;
}
