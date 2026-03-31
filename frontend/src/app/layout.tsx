import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Cinzel, Montserrat, Inter } from 'next/font/google'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

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
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable} ${inter.variable} ${geist.variable}`}>
      <body className="text-black overflow-x-hidden">
        {/* Background gradient */}
            
        <Navbar />
          <main className = "mt-16 lg:mt-20">
            
            {children}
            
          </main>
        <Footer />
      </body>
    </html>
  );
}