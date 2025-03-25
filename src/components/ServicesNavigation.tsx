'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Route = {
    path: string
    label: string
}

export const ServicesNavigation = ({ routes }: { routes: Route[] }) => {
    const pathname = usePathname();


    return (
        <section id="servicesNavigation">
            <div className="relative py-16 sm:ml-8 md:ml-24 mt-28 flex flex-col gap-4">
                <div className="absolute left-0 top-0 h-full w-24 md:w-40 bg-zinc-200 z-[-1] rounded-tr-[50px] rounded-bl-[50px]" />
                {routes.map((route) =>
                (
                    <Link
                        key={route.path}
                        href={route.path}
                        className={`ml-16 font-bold font-serif text-xs sm:text-xl md:text-2xl group transition-all ease-out ${pathname === route.path ? 'text-black' : 'text-zinc-400 hover:text-black'}`}
                    >
                        <span className="relative">
                            {route.label}
                            <span className={`absolute left-0 top-[40%] h-2 z-[-1] bg-salongreen transition-all duration-300 ease-out
                            ${pathname === route.path ? 'w-full' : 'w-0 group-hover:w-full'}`}
                            />
                        </span>
                    </Link>
                )
                )}
            </div>
        </section>
    );
}
