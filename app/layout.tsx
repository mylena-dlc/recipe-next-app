import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ClerkProvider } from '@clerk/nextjs';


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
    <ClerkProvider>
      <html lang="en">
        <body className=" bg-red-50 dark:bg-gray-900 min-h-screen p-10 text-slate-500 dark:text-white">
          <NavBar />
          <main className="pt-24">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>

  );
}
