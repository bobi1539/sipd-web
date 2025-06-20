import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

export const metadata: Metadata = {
    title: "SIPD",
    description: "Sistem Informasi Perjalanan Dinas",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
