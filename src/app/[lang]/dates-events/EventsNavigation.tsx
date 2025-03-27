'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const EventsNavigation = ({ lang, eventsNavigation }: { lang: 'de' | 'en', eventsNavigation: string[] }) => {
    const pathname = usePathname();

    const routes = [
        { path: `/${lang}/dates-events`, label: eventsNavigation[0] },
        { path: `/${lang}/dates-events/vortraege`, label: eventsNavigation[1] },
        { path: `/${lang}/dates-events/podcasts`, label: eventsNavigation[2] },
        { path: `/${lang}/dates-events/tv`, label: eventsNavigation[3] },
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
                        <span className={`absolute left-0 top-[40%] h-4 z-[-1] bg-salongreen transition-all duration-300 ease-out
                            ${pathname === route.path ? 'w-full' : 'w-0 group-hover:w-full'}`}
                        />
                    </span>
                </Link>
            )
            )}
        </div>
    );
}
