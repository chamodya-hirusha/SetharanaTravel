import type { Metadata } from "next";
import { Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
import { getContactSettings } from "@/utils/contact-settings";

// Configure Noto Sans Sinhala font
const notoSansSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sinhala",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Setharana Travels | Start Your Dream Journey Today",
  description: "A safe and unforgettable journey with Sri Lanka's trusted travel service. The best travel service in Anuradhapura for Buddhist pilgrimages, Sri Pada pilgrimages, one-day tours, family tours and special travel packages.",
  keywords: "pilgrimages, Sri Pada pilgrimages, one day tours, family tours, travel services, Setharana Travels, Sri Lanka travel services, Anuradhapura tours",
  authors: [{ name: "Setharana Travels", url: "https://setharanatravels.lk" }],
  creator: "Setharana Travels",
  publisher: "Setharana Travels",
  metadataBase: new URL("https://setharanatravels.lk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Setharana Travels | Start Your Dream Journey Today",
    description: "A safe and unforgettable journey with Sri Lanka's trusted travel service. The leading travel agency operating from Anuradhapura.",
    url: "https://setharanatravels.lk",
    siteName: "Setharana Travels",
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Setharana Travels | Start Your Dream Journey Today",
    description: "A safe and unforgettable journey with Sri Lanka's trusted travel service.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactSettings = await getContactSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": contactSettings?.companyName || "Setharana Travels",
    "logo": "/logo.png",
    "image": "/logo.png",
    "@id": "https://setharanatravels.lk/#agency",
    "url": "https://setharanatravels.lk",
    "telephone": contactSettings?.phone || "+94774222970",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contactSettings?.address || "Anuradhapura",
      "addressLocality": contactSettings?.city || "Anuradhapura",
      "postalCode": "50000",
      "addressCountry": contactSettings?.country || "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.3444,
      "longitude": 80.3168
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      contactSettings?.facebook || "https://facebook.com/profile.php?id=100086577527000",
      contactSettings?.youtube || "https://youtube.com/@srysetharanatv4741",
      contactSettings?.instagram,
      contactSettings?.linkedin,
      contactSettings?.tiktok
    ].filter(Boolean)
  };

  return (
    <html
      lang="en"
      className={`${notoSansSinhala.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sinhala bg-white text-gray-900 select-none antialiased">
        {children}
      </body>
    </html>
  );
}
