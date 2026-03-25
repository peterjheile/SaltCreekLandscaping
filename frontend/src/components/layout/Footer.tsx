import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Logo from "@/public/salt-creek-logo.png";

const Footer = () => {
  return (
    <footer className="bg-white mt-10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          
          {/* Logo + Branding */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="/">
              <Image
                src={Logo}
                alt="Salt Creek Landscaping"
                width={160}
                height={40}
                className="object-contain"
              />
            </a>

            <p className="max-w-sm text-sm text-gray-600 text-center md:text-left">
              Professional lawn care and landscaping services built on quality,
              reliability, and attention to detail.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:justify-start">
            <a href="#" className="text-gray-600 hover:text-black transition">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition">
              Gallery
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition">
              Contact
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5">
            <a href="#" className="text-gray-600 hover:text-black transition">
              <FaFacebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition">
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Salt Creek Landscaping. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;