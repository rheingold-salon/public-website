import { db, publicationsTable } from "@rgs/db";
import { PublicationCard } from "@/components";

export default async function NewsPublikationenPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const publications = await db.select().from(publicationsTable)
    const lang = (await params).lang

    return (
        <div className="grid grid-cols-2">
            {publications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} lang={lang} />
            ))}
        </div>
    );
}
