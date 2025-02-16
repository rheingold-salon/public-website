'use client'

import { useState } from "react";
import { EventCard } from "@/components";

type Event = {
    id: number,
    title: string,
    content: string,
    date: string,
    time: string,
    location: string,
    imagePath: string,
    externalLink: string,
}

export const EventsComposer = ({ months, pastEvents, futureEvents }: { months: string[], pastEvents: Event[], futureEvents: Event[] }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const currentMonth = months[today.getMonth()];
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    // Get the next upcoming event (if any)
    const nextupEvent = futureEvents.length > 0 ? futureEvents[0] : null;

    return (
        <>
            <div className="mt-8 className flex flex-col md:flex-row">
                <div className="px-8 bg-zinc-200 h-52 w-screen md:h-screen md:w-96 flex flex-col items-end justify-center">
                    <p className="font-serif text-5xl font-semibold md:mt-20 mr-8">next</p>
                    <p className="font-serif text-5xl font-semibold mt-2 mr-8">& up</p>
                </div>
                {nextupEvent && <EventCard event={nextupEvent} month={months[parseInt(nextupEvent.date.split("-")[1]) - 1]} />}
            </div>
            <div className="my-8 flex justify-around">
                {months.map(month => (
                    <p onClick={() => setSelectedMonth(month)} key={month} className={`hover:cursor-pointer text-xs md:text-2xl font-semibold 
                        ${selectedMonth === month ? "text-black" : "text-zinc-400 hover:text-black"} group hover:text-black transition-all ease-out`}>
                        <span className="relative">{month}
                            <span className={`absolute left-0 top-1/3 h-2 z-[-1] bg-salongreen transition-all duration-300 ease-out
                            ${selectedMonth === month ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                        </span>
                    </p>
                ))}
            </div>
            <div className="container p-8">
                <div className="grid gap-4">
                    {futureEvents.length > 0 && futureEvents.filter((event) => months[parseInt(event.date.split("-")[1]) - 1] === selectedMonth).map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            month={selectedMonth}
                        />
                    ))}
                </div>

                {/* Past Events Section */}
                {pastEvents.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-serif font-semibold mb-8 text-zinc-300">LEIDER SCHON VORBEI</h2>
                        <div className="grid gap-4">
                            {pastEvents
                                .filter((event) => months[parseInt(event.date.split("-")[1]) - 1] === selectedMonth)
                                .map((event) => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        month={selectedMonth}
                                    />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </>

    );

}
