import { db, getPublications, publicationtagsTable, tagsTable } from "@rgs/db";
import { PublicationsComposer } from "@/components";

export default async function NewsPublikationenPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const publications = await getPublications()
    const tags = await db.select().from(tagsTable);
    const publicationTags = await db.select().from(publicationtagsTable)

    const lang = (await params).lang

    return (
        <PublicationsComposer lang={lang} publications={publications} tags={tags} publicationTags={publicationTags} />
    );
}
