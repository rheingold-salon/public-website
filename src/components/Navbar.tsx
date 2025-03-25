'use client';

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

import { logoImage } from "@/assets"

export const Navbar = (
    { lang,
        marketResearchHeader,
        foundersTeamHeader,
        publicationsHeader,
        referencesHeader,
        contactHeader }:
        {
            lang: string,
            marketResearchHeader: string,
            foundersTeamHeader: string,
            publicationsHeader: string,
            referencesHeader: string,
            contactHeader: string,
        }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navLinks = [
        { href: `/${lang}/marktforschung-services`, label: `${marketResearchHeader}` },
        { href: `/${lang}/salon-rheingold`, label: "salon & rheingold" },
        { href: `/${lang}/gruender-team`, label: `${foundersTeamHeader}` },
        { href: `/${lang}/dates-events`, label: "dates & events" },
        { href: `/${lang}/news-publikationen`, label: `${publicationsHeader}` },
        { href: `/${lang}/referenzen-cases`, label: `${referencesHeader}` },
        { href: `/${lang}/#contact`, label: `${contactHeader}` },
    ];

    return (
        <nav className="fixed w-full bg-zinc-800 bg-opacity-60 backdrop-blur-sm z-50">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href={`/${lang}/`} >
                            <Image
                                src={logoImage}
                                alt="Rheingold Salon Logo"
                                style={{
                                    objectFit: "contain"
                                }}
                                priority
                                className="w-32 h-16"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex flex-1 justify-end">
                        <div className="ml-8 flex items-center space-x-4 text-sm xl:text-base">
                            {navLinks.map((link) => {
                                if (link.label === "kontakt" || link.label === "contact") {
                                    return (
                                        <div key={link.href} className="grid grid-cols-2 gap-4">
                                            <Link
                                                href={`/de/${pathname.split("/").slice(2).join("/")}`}
                                                className="relative font-bold text-white group"
                                            >
                                                <span className="relative">
                                                    de
                                                    <span className={`absolute left-0 top-1/3 w-0 h-2 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out
                                            ${pathname.startsWith("/de") ? "w-full" : ""}`}>
                                                    </span>
                                                </span>
                                            </Link>
                                            <Link
                                                href={`/en/${pathname.split("/").slice(2).join("/")}`}
                                                className="relative font-bold text-white group"
                                            >
                                                <span className="relative">
                                                    en
                                                    <span className={`absolute left-0 top-1/3 w-0 h-2 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out
                                            ${pathname.startsWith("/en") ? "w-full" : ""}`}>
                                                    </span>
                                                </span>
                                            </Link>
                                            <Link
                                                href={link.href}
                                                className="relative font-bold text-white group col-span-2"
                                            >
                                                <span className="relative">
                                                    {link.label}
                                                    <span className={`absolute left-0 top-1/3 w-0 h-2 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out
                                            ${(pathname === link.href) ? "w-full" : ""}`}>
                                                    </span>
                                                </span>
                                            </Link>
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="relative font-bold text-white group"
                                        >
                                            <span className="relative">
                                                {link.label}
                                                <span className={`absolute left-0 top-1/3 w-0 h-2 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out
                                            ${(pathname === link.href) ? "w-full" : ""}`}>
                                                </span>
                                            </span>
                                        </Link>
                                    );
                                }
                            })}
                        </div>
                    </div>


                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white p-2"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <RxCross2 className="h-6 w-6" />
                            ) : (
                                <RxHamburgerMenu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${isOpen
                        ? "max-h-screen opacity-100 py-4"
                        : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                >
                    <div className="flex flex-col space-y-4 pb-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-white font-bold px-4 py-2 relative group" 
                                    }`}
                            >
                                <span className="relative">
                                    {link.label}
                                    <span className={`absolute left-0 top-1/3 w-0 h-2 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out
                                        ${pathname === link.href ? "w-full" : ""}`}>
                                    </span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
