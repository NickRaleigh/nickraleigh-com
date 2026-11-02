import type { Metadata } from "next";
import { Hanken_Grotesk, Jost, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import { config } from "@/config/site";
import "../scss/app.scss";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jost",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.global.url),
  title: "Nick Raleigh | Design Engineer",
  description:
    "Nick Raleigh is a Colorado design engineer who designs product interfaces and builds them in React. Eleven years of front-end engineering and product design.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: config.global.name,
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${jost.variable} ${dmSerifDisplay.variable}`}
    >
      <body>
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yfrb4k2hg5");`}
        </Script>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
