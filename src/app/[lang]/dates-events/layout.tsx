import { getDictionary } from "@/dictionaries";
import Link from "next/link";

export default async function DatesEventsLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: 'en' | 'de' }>
}) {
    const lang = (await params).lang;
    const dict = (await getDictionary(lang)).datesEventsPage;

    return (
        <>
            <div className="pt-28 flex justify-around">
                <Link href={`/${lang}/dates-events`} className="text-zinc-400 font-bold text-6xl group hover:text-black transition-all ease-out">
                    <span className="relative">Events
                        <span className={`absolute left-0 top-1/3 w-0 h-4 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                    </span>
                </Link>
                <Link href={`/${lang}/dates-events/vortraege`} className="text-zinc-400 font-bold text-6xl group hover:text-black transition-all ease-out">
                    <span className="relative">Vorträge
                        <span className={`absolute left-0 top-1/3 w-0 h-4 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                    </span>
                </Link>
                <Link href={`/${lang}/dates-events/podcasts`} className="text-zinc-400 font-bold text-6xl group hover:text-black transition-all ease-out">
                    <span className="relative">Podcasts
                        <span className={`absolute left-0 top-1/3 w-0 h-4 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                    </span>
                </Link>
                <Link href={`/${lang}/dates-events/tv`} className="text-zinc-400 font-bold text-6xl group hover:text-black transition-all ease-out">
                    <span className="relative">TV
                        <span className={`absolute left-0 top-1/3 w-0 h-4 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                    </span>
                </Link>
            </div>
            <div className="mt-8 bg-zinc-200 h-screen w-96 flex flex-col items-end">
                <p className="font-serif text-5xl font-semibold mt-20 mr-8">next</p>
                <p className="font-serif text-5xl font-semibold mt-2 mr-8">& up</p>
            </div>
            <div className="my-8 flex justify-around">
                {dict.months.map(month => (
                    <p key={month} className="hover:cursor-pointer text-2xl font-semibold text-zinc-400 group hover:text-black transition-all ease-out">
                        <span className="relative">{month}
                            <span className={`absolute left-0 top-1/3 w-0 h-2 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                        </span>
                    </p>
                ))}
            </div>
            {children}
        </>
    );
}
