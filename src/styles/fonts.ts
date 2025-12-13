import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fonts = {
  geistSans,
  geistMono,
  sourceSerif4,
};

export default fonts;
