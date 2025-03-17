import { db } from "@rgs/db";
import { publicationsTable, tagsTable } from "@rgs/db";

export default async function NewsPublicationsPage() {
    const publications = db.select().from(publicationsTable)
    const tags = db.select().from(tagsTable)
    return (
        <div className="m-10">
            <h1 className="font-bold text-xl text-center mb-4">news &amp; publications</h1>
        </div>

    );

}
