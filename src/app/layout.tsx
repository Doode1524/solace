import type { Metadata } from "next";
import logo from './favicon.ico'
import  "./globals.css";

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="app-container">
          <img className="logo" src={logo.src} />
          {children}
        </main>
      </body>
    </html>
  );
}
