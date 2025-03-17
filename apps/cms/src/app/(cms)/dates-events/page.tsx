import { eventsTable } from "@rgs/db";
import { db } from "@/server/db";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function DatesEventsPage() {
    const events = await db.select().from(eventsTable);
    return (
        <div className="m-10">
            <h1 className="text-center font-bold text-xl mb-4">
                dates &amp; events
            </h1>
            <DataTable columns={columns} data={events} />
        </div>
    );
}
