import { columns } from "./columns";
import { DataTable } from "./data-table";
import { peopleTable } from "@rgs/db";
import { db } from "@/server/db";

export default async function FoundersTeamPage() {
    const data = await db.select().from(peopleTable)
    return (
        <div className="m-10">
            <h1 className="text-xl font-bold mb-4 text-center">founders &amp; team</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
