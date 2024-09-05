import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Providers from "@/services/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bosque",
  description: "Mini productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { version: appVersion } = require("package.json");

  console.log(`Bosque Main APP - ${appVersion}`);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div id="bosque">
            <Sidebar />
            <div id="bosqueContent">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
