import { db } from "@/db";
import { eventsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function TvPage() {
    const events = await db.select().from(eventsTable)//.where(eq(eventsTable.type, "event"));

    return (
        <div className="container mx-auto px-4">
            <div className="grid gap-4">
                {events.map((event) => (
                    <div key={event.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl font-bold">{event.title}</h2>
                        <p className="text-gray-600">
                            {new Date(event.date).toLocaleDateString()} {event.time && new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], { timeStyle: 'short' })}
                        </p>
                        <p className="mt-2">{event.content}</p>
                        <p className="text-gray-600 mt-2">{event.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
