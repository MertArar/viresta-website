import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viresta | Kurumsal Çözümler",
  description:
    "Finansal danışmanlık, kurumsal strateji, iş geliştirme ve yönetim danışmanlığı çözümleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main className="pt-[92px]">{children}</main>
      </body>
    </html>
  );
}