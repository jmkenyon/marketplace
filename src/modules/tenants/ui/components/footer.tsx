import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
})


export const Footer = () => {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex gap-2 items-center h-full px-4 lg:px-12 py-6">
        <p>Feito com</p>
        <Link href="/">
          <span className={cn("text-xl font-semibold", poppins.className)}>
            Learnly
          </span>
        </Link>
      </div>
    </footer>
  );
};
