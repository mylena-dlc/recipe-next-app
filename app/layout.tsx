import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";


export const metadata: Metadata = {
  title: "Recipe App",
  description: "Application de gestion de recettes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-900 min-h-screen p-10 text-white">
        <NavBar />
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
