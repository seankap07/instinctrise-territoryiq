import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InstinctRise | TerritoryIQ — Own Your ZIP. Dominate Your Market.",
  description: "TerritoryIQ by InstinctRise: Exclusive territory intelligence for contractors. One trade per ZIP. Predict failures before they happen. Stop sharing leads — own your market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
