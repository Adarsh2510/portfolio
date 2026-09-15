import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Footer from "./components/footer";
import Header from "./components/header";
import { appShell } from "./layout.styles";
import { defaultOgImage } from "@/content/seo";
import { isIndexable, site } from "@/content/site";
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
  robots: isIndexable ? undefined : { index: false, follow: false },
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
        <Analytics />
        {isIndexable ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "yik475ank8");
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
