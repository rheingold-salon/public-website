import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    weight: "400",
    variable: "--font-roboto",
    subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
    variable: "--font-roboto-slab",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "lönneker & imdahl - CMS",
    description: "Website Rheingold Salon",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.variable} ${robotoSlab.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
