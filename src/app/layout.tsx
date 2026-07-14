import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "കയിക്ക് — Premium Food Delivery",
    template: "%s | കയിക്ക്",
  },
  description:
    "Order from the best restaurants in your city. Fast delivery, real-time tracking, and premium food experience.",
  keywords: [
    "food delivery",
    "restaurant",
    "order food",
    "കയിക്ക്",
    "online food",
  ],
  authors: [{ name: "കയിക്ക്" }],
  creator: "കയിക്ക്",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kayikk.com",
    title: "കയിക്ക് — Premium Food Delivery",
    description: "Order from the best restaurants. Fast, fresh, delivered.",
    siteName: "കയിക്ക്",
  },
  twitter: {
    card: "summary_large_image",
    title: "കയിക്ക് — Premium Food Delivery",
    description: "Order from the best restaurants. Fast, fresh, delivered.",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#8B5CF6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0D0B14] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
