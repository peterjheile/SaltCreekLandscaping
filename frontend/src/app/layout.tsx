import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Cedar Creek Landscaping",
  description: "Professional lawn care and landscaping services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="text-black">
        <Navbar />
        <main className="pt-28">{children}</main>
      </body>
    </html>
  );
}