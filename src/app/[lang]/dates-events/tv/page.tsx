import { EventsComposer } from "@/components"
import { eventTypeEnum } from "@/db/schema";
import { getDictionary } from "@/dictionaries";
import { getPastEvents, getFutureEvents } from "@/db/actions";

export default async function TvPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const months = (await getDictionary(lang)).datesEventsPage.months

    const pastEvents = await getPastEvents(lang, eventTypeEnum.enumValues[3]);
    const futureEvents = await getFutureEvents(lang, eventTypeEnum.enumValues[3]);

    return (
        <EventsComposer months={months} pastEvents={pastEvents} futureEvents={futureEvents} />
    );
}

