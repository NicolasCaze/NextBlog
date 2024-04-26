import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/query-provider";
import AuthProvider from "@/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Blog",
  description: "Created By Caze Nicolas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
          <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <div className="flex flex-grow">
        {children}
        </div>
        <Footer />
        </div>
        </ThemeProvider>
        </AuthProvider>
        </QueryProvider>
        </body>
        
    </html>
  );
}
