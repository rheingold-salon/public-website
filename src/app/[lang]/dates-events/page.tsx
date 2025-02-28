import { eventTypeEnum } from "@/db/schema";
import { getPastEvents, getFutureEvents } from "@/db/actions";
import { EventsComposer } from "@/components"
import { getDictionary } from "@/dictionaries";

export default async function DatesEventsPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const datesEventsPageDict = (await getDictionary(lang)).datesEventsPage

    const pastEvents = await getPastEvents(lang, eventTypeEnum.enumValues[0]);
    const futureEvents = await getFutureEvents(lang, eventTypeEnum.enumValues[0]);

    return (
        <EventsComposer
            alreadyOverText={datesEventsPageDict.alreadyOver}
            months={datesEventsPageDict.months}
            pastEvents={pastEvents}
            futureEvents={futureEvents}
        />
    );
}

