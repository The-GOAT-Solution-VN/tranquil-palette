import type { Metadata } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tranquilpalette.art";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tranquil Palette — A home gallery in Hanoi",
    template: "%s · Tranquil Palette",
  },
  description:
    "The private home gallery of Huong Pham — true-to-life paintings in oil and acrylic, drawn from a quiet, attentive life in Hanoi.",
  openGraph: {
    title: "Tranquil Palette — A home gallery in Hanoi",
    description:
      "True-to-life paintings in oil and acrylic by Huong Pham, shown in her home gallery in Hanoi.",
    type: "website",
    siteName: "Tranquil Palette",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${beVietnam.variable}`}
    >
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
