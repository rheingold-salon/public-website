import React from "react";

import { EventsNavigation } from "@/components"

export default async function DatesEventsLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: 'en' | 'de' }>
}) {
    const lang = (await params).lang;

    return (
        <>
            <EventsNavigation lang={lang} />
            {children}
        </>
    );
}
