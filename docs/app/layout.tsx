import "@/app/globals.css";
import { JsocLogo } from "@/components/";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Head } from "nextra/components";
import "nextra-theme-docs/style.css";
import { Footer, Navbar, Layout } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSOC Documentation",
  description: "Documentation for JSOC, library for dynamic components.",
};

const navbar = (
  <Navbar logo={<JsocLogo />} projectLink="https://github.com/jsoc-dev/jsoc" />
);

const footer = <Footer>{`MIT ${new Date().getFullYear()} © JSOC`}</Footer>;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/jsoc-dev/jsoc/tree/main/docsite"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
