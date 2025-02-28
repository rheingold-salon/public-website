import React from "react";

import { EventsNavigation } from "@/components"
import { getDictionary } from "@/dictionaries";

export default async function DatesEventsLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: 'en' | 'de' }>
}) {
    const lang = (await params).lang;
    const eventsNavigation = (await getDictionary(lang)).datesEventsPage.eventsNavigation;

    return (
        <>
            <EventsNavigation lang={lang} eventsNavigation={eventsNavigation} />
            {children}
        </>
    );
}
