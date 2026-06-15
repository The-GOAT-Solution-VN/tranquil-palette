import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative", overflowX: "hidden", minHeight: "100vh" }}>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
