'use client'

import Link from "next/link";
import { FaArrowLeft, FaArrowUp, FaArrowRight } from "react-icons/fa"
import { usePathname } from "next/navigation";

type Route = {
    path: string,
    label: string
}

export function ServiceFooter({ routes, nextButtonText, backButtonText }: { routes: Route[], nextButtonText: string, backButtonText: string }) {
    const pathname = usePathname();

    const currentRouteIndex = routes.findIndex((route) => route.path === pathname);
    const prevIndex = currentRouteIndex - 1;
    const nextIndex = currentRouteIndex + 1;


    return (
        <div className="flex justify-center gap-x-4 md:gap-x-8 mb-24">
            {prevIndex >= 0 && <Link href={routes[prevIndex].path} className="flex p-4 text-base md:text-lg rounded-tr-xl rounded-bl-xl font-bold gap-x-2 items-center bg-salongreen text-white"><FaArrowLeft />{backButtonText}</Link>}
            <Link href="#servicesNavigation" className="flex p-4 text-base md:text-lg rounded-tr-xl rounded-bl-xl font-bold gap-x-2 items-center bg-salongreen text-white"><FaArrowUp />navigation</Link>
            {nextIndex < routes.length && <Link href={routes[nextIndex].path} className="flex p-4 text-base md:text-lg rounded-tr-xl rounded-bl-xl font-bold gap-x-2 items-center bg-salongreen text-white"><FaArrowRight />{nextButtonText}</Link>}
        </div>

    );

}
