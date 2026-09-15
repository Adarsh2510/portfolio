import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import Header from "./components/header";
import { appShell } from "./layout.styles";
import { defaultOgImage } from "@/content/seo";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [defaultOgImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const styles = appShell();

  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>
        <Header />
        <main id="main-content" className={styles.main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
