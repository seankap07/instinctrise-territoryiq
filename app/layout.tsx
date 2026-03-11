import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TerritoryIQ by InstinctRise — Own Your ZIP. Dominate Your Market.",
  description: "TerritoryIQ: Exclusive territory intelligence for contractors. One trade per ZIP. Predict roof and HVAC replacements before the homeowner calls anyone. Stop sharing leads — own your market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
