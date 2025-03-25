import { eventTypeEnum } from "@/server/db";
import { getPastEvents, getFutureEvents } from "@/server/db/read-actions";
import { EventsComposer } from "@/components"
import { getDictionary } from "@/dictionaries";

export default async function PodcastsPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const datesEventsPageDict = (await getDictionary(lang)).datesEventsPage

    const pastEvents = await getPastEvents(lang, eventTypeEnum.enumValues[2]);
    const futureEvents = await getFutureEvents(lang, eventTypeEnum.enumValues[2]);

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
