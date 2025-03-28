import { db, tagsTable, publicationtagsTable } from "@/server/db";
import { getPublications } from "@/server/db/read-actions";
import { PublicationsComposer } from "./PublicationsComposer";

export default async function NewsPublikationenPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang

    const publications = (await getPublications()).map((publication) => ({
        id: publication.id,
        title: lang === "de" ? publication.titleDe : publication.titleEn,
        publishedAt: publication.publishedAt,
        author: publication.author,
        content: lang === "de" ? publication.contentDe : publication.contentEn,
        imagePath: publication.imagePath,
        homePageSlider: publication.homePageSlider,
    }))

    const tags = (await db.select().from(tagsTable)).map((tag) => ({
        id: tag.id,
        name: lang === "de" ? tag.nameDe : tag.nameEn,
    }));
    const publicationTags = await db.select().from(publicationtagsTable)

    return (
        <PublicationsComposer lang={lang} publications={publications} tags={tags} publicationTags={publicationTags} />
    );
}
