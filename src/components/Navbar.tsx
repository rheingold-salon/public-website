'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navLinks = [
        { href: "/marktforschung-services", label: "marktforschung & services" },
        { href: "/salon-rheingold", label: "salon & rheingold" },
        { href: "/gruender-team", label: "gründer & team" },
        { href: "/dates-events", label: "dates & events" },
        { href: "/news-publikationen", label: "news & publikationen" },
        { href: "/referenzen-cases", label: "referenzen & cases" },
        { href: "/#contact", label: "kontakt" },
    ];

    return (
        <nav className="fixed w-full bg-zinc-800 bg-opacity-60 backdrop-blur-sm z-50">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                alt="Rheingold Salon Logo"
                                width={120}
                                height={40}
                                className="object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-end">
                        <div className="ml-8 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative font-bold text-white group ${pathname === link.href ? "text-salongreen" : ""
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

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
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
                                className={`text-white font-bold px-4 py-2 relative group ${pathname === link.href ? "text-salongreen" : ""
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
        </nav>
    );
};

export default Navbar;
