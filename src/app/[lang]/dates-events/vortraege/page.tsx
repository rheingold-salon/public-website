import { eventTypeEnum } from "@/db/schema";
import { getPastEvents, getFutureEvents } from "@/db/actions";
import { EventsComposer } from "@/components"
import { getDictionary } from "@/dictionaries";

export default async function VortraegePage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const datesEventsPageDict = (await getDictionary(lang)).datesEventsPage

    const pastEvents = await getPastEvents(lang, eventTypeEnum.enumValues[1]);
    const futureEvents = await getFutureEvents(lang, eventTypeEnum.enumValues[1]);

    return (
        <EventsComposer
            alreadyOverText={datesEventsPageDict.alreadyOver}
            months={datesEventsPageDict.months}
            pastEvents={pastEvents}
            futureEvents={futureEvents}
        />
    );
}
