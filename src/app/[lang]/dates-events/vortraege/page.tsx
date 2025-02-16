import { eventTypeEnum } from "@/db/schema";
import { getPastEvents, getFutureEvents } from "@/db/actions";
import { EventsComposer } from "@/components"
import { getDictionary } from "@/dictionaries";

export default async function VortraegePage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const months = (await getDictionary(lang)).datesEventsPage.months

    const pastEvents = await getPastEvents(lang, eventTypeEnum.enumValues[1]);
    const futureEvents = await getFutureEvents(lang, eventTypeEnum.enumValues[1]);

    return (
        <EventsComposer months={months} pastEvents={pastEvents} futureEvents={futureEvents} />
    );
}
