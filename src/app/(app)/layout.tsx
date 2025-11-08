import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Formara — O Marketplace Definitivo para Criadores Digitais do Brasil",
  description:
    "Transforme suas ideias em renda. Crie, publique e venda produtos digitais com segurança, autonomia e tecnologia 100% brasileira.",
  keywords: [
    "Formara",
    "marketplace digital",
    "criadores brasileiros",
    "venda conteúdo digital",
    "monetização online",
    "plataforma para criadores",
    "Gumroad brasileiro",
    "Stripe Connect",
    "Next.js marketplace",
  ],
  authors: [{ name: "Formara Team", url: "https://formara.com.br" }],
  creator: "Formara",
  publisher: "Formara",
  metadataBase: new URL("https://formara.com.br"),
  openGraph: {
    title: "Formara — O Marketplace Digital dos Criadores Brasileiros",
    description:
      "Venda seus eBooks, cursos e produtos digitais com a plataforma feita para criadores brasileiros.",
    url: "https://formara.com.br",
    siteName: "Formara",
    images: [
      {
        url: "/placeholder-image.png", // ideal 1200x630 but need to change later
        width: 1200,
        height: 630,
        alt: "Formara - Marketplace Digital dos Criadores",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://formara.com.br",
  },
  category: "digital marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
