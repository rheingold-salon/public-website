'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const EventsNavigation = ({ lang }: { lang: 'de' | 'en' }) => {
    const pathname = usePathname();

    const routes = [
        { path: `/${lang}/dates-events`, label: "Events" },
        { path: `/${lang}/dates-events/vortraege`, label: "Vorträge" },
        { path: `/${lang}/dates-events/podcasts`, label: "Podcasts" },
        { path: `/${lang}/dates-events/tv`, label: "TV" },
    ];

    return (
        <div className="pt-28 flex justify-around">
            {routes.map((route) =>
            (
                <Link
                    key={route.path}
                    href={route.path}
                    className={`font-bold text-2xl md:text-6xl group transition-all ease-out ${pathname === route.path ? 'text-black' : 'text-zinc-400 hover:text-black'}`}
                >
                    <span className="relative">
                        {route.label}
                        <span className={`absolute left-0 top-1/3 h-4 z-[-1] bg-salongreen transition-all duration-300 ease-out
                            ${pathname === route.path ? 'w-full' : 'w-0 group-hover:w-full'}`}
                        />
                    </span>
                </Link>
            )
            )}
        </div>
    );
}
