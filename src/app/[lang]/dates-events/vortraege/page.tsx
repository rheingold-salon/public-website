import { eventTypeEnum } from "@/server/db";
import { getPastEvents, getFutureEvents } from "@/server/db/read-actions";
import { EventsComposer } from "../EventsComposer";
import { getDictionary } from "@/dictionaries";

export default async function VortraegePage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const datesEventsPageDict = (await getDictionary(lang)).datesEventsPage

    const pastEvents = await getPastEvents(lang, eventTypeEnum.enumValues[1]);
    const futureEvents = await getFutureEvents(lang, eventTypeEnum.enumValues[1]);

    return (
        <EventsComposer
            noUpcomingText={datesEventsPageDict.noUpcomingText}
            alreadyOverText={datesEventsPageDict.alreadyOver}
            months={datesEventsPageDict.months}
            pastEvents={pastEvents}
            futureEvents={futureEvents}
        />
    );
}
