import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Playfair_Display, Pacifico, Amiri, Fredoka, Sniglet } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const sniglet = Sniglet({
  variable: "--font-sniglet",
  weight: ["400", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eid Card Generator",
  description: "Create and share beautiful personalized Eid cards.",
};

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jakarta.variable} ${playfair.variable} ${pacifico.variable} ${amiri.variable} ${fredoka.variable} ${sniglet.variable} font-sans antialiased text-slate-900 bg-slate-50`}>
        <SmoothScrollProvider>
          {children}
          {/* Grainy Texture Overlay */}
          <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mixture-normal contrast-150 brightness-150"
            style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
