import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import { Navbar, Footer } from "@/components";
import "./globals.css";
import { getDictionary } from "@/dictionaries";

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
    title: "lönneker & imdahl - Startseite",
    description: "Website Rheingold Salon",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ lang: 'en' | 'de' }>
}>) {
    const lang = (await params).lang;
    const dict = (await getDictionary(lang));
    return (
        <html lang={lang}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body
                className={`${roboto.variable} ${robotoSlab.variable} antialiased`}
            >
                <Navbar lang={lang}
                    marketResearchHeader={dict.navbar.marketResearchHeader}
                    foundersTeamHeader={dict.navbar.foundersTeamHeader}
                    publicationsHeader={dict.navbar.publicationsHeader}
                    referencesHeader={dict.navbar.referencesHeader}
                    contactHeader={dict.navbar.contactHeader}
                />
                <main className="">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
