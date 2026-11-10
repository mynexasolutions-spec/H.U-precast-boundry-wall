import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/ui/FloatingActions";
import { siteConfig } from "@/data/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: `${siteConfig.name} – Durable Cement Products for Modern Construction`,
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
