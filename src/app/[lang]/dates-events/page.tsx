import { db } from "@/db";
import { eventsTable, eventTypeEnum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EventCard } from "@/components"
import { getDictionary } from "@/dictionaries";

export default async function EventsPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const months = (await getDictionary(lang)).datesEventsPage.months

    const events = await db.select({
        id: eventsTable.id,
        title: lang === 'de' ? eventsTable.titleDe : eventsTable.titleEn,
        content: lang === 'de' ? eventsTable.contentDe : eventsTable.contentEn,
        location: eventsTable.location,
        date: eventsTable.date,
        time: eventsTable.time,
        imagePath: eventsTable.imagePath,
        externalLink: eventsTable.externalLink,
    }).from(eventsTable).where(eq(eventsTable.type, eventTypeEnum.enumValues[0]));

    return (
        <div className="container mx-auto px-4">
            <div className="grid gap-4">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={{
                            title: event.title,
                            content: event.content,
                            location: event.location,
                            date: event.date,
                            time: event.time,
                            imagePath: event.imagePath,
                            externalLink: event.externalLink
                        }}
                        months={months}
                    />
                ))}
            </div>
        </div>
    );
}
