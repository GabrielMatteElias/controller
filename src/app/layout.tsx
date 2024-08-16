import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev controle - Seu sistema de gerenciamento",
  description: "Gerencie seus clientes e atendimento de forma fácil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}
