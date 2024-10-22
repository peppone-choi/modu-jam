import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "최병호의 웹앱",
  description: "최병호의 웹앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
