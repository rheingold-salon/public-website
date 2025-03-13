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
    highlight: boolean
}

export const EventsComposer = ({ alreadyOverText, months, pastEvents, futureEvents }: { alreadyOverText: string, months: string[], pastEvents: Event[], futureEvents: Event[] }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const currentMonth = months[today.getMonth()];
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    // Get highlight event (if any) else use the next up event
    const highlightEvent = futureEvents.find((futureEvent) => futureEvent.highlight) ?? futureEvents[0];

    // Filter past events for the selected month
    const filteredPastEvents = pastEvents.filter(
        (event) => months[parseInt(event.date.split("-")[1]) - 1] === selectedMonth
    );

    // Filter future events for the selected month
    const filteredFutureEvents = futureEvents.filter(
        (event) => months[parseInt(event.date.split("-")[1]) - 1] === selectedMonth
    );

    return (
        <>
            <div className="m-8 md:ml-0 className flex flex-col md:flex-row gap-4 items-center">
                <div className="px-8 bg-zinc-200 h-[250px] md:h-[550px] w-screen md:w-96 flex flex-col items-end justify-center">
                    <p className="font-serif text-5xl font-semibold mr-8">high</p>
                    <p className="font-serif text-5xl font-semibold mt-2 mr-8">& light</p>
                </div>
                {highlightEvent && <EventCard event={highlightEvent}
                    month={months[parseInt(highlightEvent.date.split("-")[1]) - 1]}
                />}
            </div>
            {/* Month selector */}
            <div className="my-8 flex justify-center flex-wrap gap-4 md:gap-8">
                {months.map(month => (
                    <p
                        onClick={() => setSelectedMonth(month)}
                        key={month}
                        className={`hover:cursor-pointer text-xs md:text-2xl font-semibold 
                        ${selectedMonth === month ? "text-black" : "text-zinc-400 hover:text-black"} 
                        group transition-all ease-out px-2`}
                    >
                        <span className="relative">{month}
                            <span className={`absolute left-0 top-1/3 h-2 z-[-1] bg-salongreen transition-all duration-300 ease-out
                            ${selectedMonth === month ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                        </span>
                    </p>
                ))}
            </div>
            <div className="container mx-auto px-4 py-4">
                <div className="grid grid-cols-1 gap-4 justify-items-center">
                    {filteredFutureEvents.length > 0 && filteredFutureEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            month={selectedMonth}
                        />
                    ))}
                </div>

                {/* Past Events Section */}
                {filteredPastEvents.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-lg md:text-3xl font-serif font-semibold mb-8 text-zinc-300">{alreadyOverText}</h2>
                        <div className="grid gap-4 justify-items-center">
                            {filteredPastEvents.map((event) => (
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
