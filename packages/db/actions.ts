'use server'

import { and, eq, sql, lt, gte, desc, inArray } from "drizzle-orm"
import { db } from ".";
import { publicationsTable, eventsTable, eventTypeEnum, tagsTable, publicationtagsTable } from "./schema";

export const getPastEvents = async (lang: 'de' | 'en', eventType: typeof eventTypeEnum.enumValues[number]) => {
    const currentYear = new Date().getFullYear();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format = new Date().getFullYear();

    return await db.select({
        id: eventsTable.id,
        title: lang === 'de' ? eventsTable.titleDe : eventsTable.titleEn,
        content: lang === 'de' ? eventsTable.contentDe : eventsTable.contentEn,
        location: eventsTable.location,
        date: eventsTable.date,
        time: eventsTable.time,
        imagePath: eventsTable.imagePath,
        externalLink: eventsTable.externalLink,
    }).from(eventsTable).where(
        and(
            eq(eventsTable.type, eventType),
            sql`EXTRACT(YEAR FROM ${eventsTable.date}) = ${currentYear}`,
            lt(eventsTable.date, today)
        )
    ).orderBy(desc(eventsTable.date), desc(eventsTable.time));
}

export const getFutureEvents = async (lang: 'de' | 'en', eventType: typeof eventTypeEnum.enumValues[number]) => {
    const currentYear = new Date().getFullYear();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format = new Date().getFullYear();

    return await db.select({
        id: eventsTable.id,
        title: lang === 'de' ? eventsTable.titleDe : eventsTable.titleEn,
        content: lang === 'de' ? eventsTable.contentDe : eventsTable.contentEn,
        location: eventsTable.location,
        date: eventsTable.date,
        time: eventsTable.time,
        imagePath: eventsTable.imagePath,
        externalLink: eventsTable.externalLink,
    }).from(eventsTable).where(
        and(
            eq(eventsTable.type, eventType),
            sql`EXTRACT(YEAR FROM ${eventsTable.date}) = ${currentYear}`,
            gte(eventsTable.date, today)
        )
    ).orderBy(eventsTable.date, eventsTable.time);
}

export const getPublicationById = async (pubId: number) => {
    return await db.select().from(publicationsTable).where(eq(publicationsTable.id, pubId))
}

export const getTagsByPublicationId = async (pubId: number) => {
    return await db.select({
        id: tagsTable.id,
        name: tagsTable.name
    })
        .from(tagsTable)
        .innerJoin(publicationtagsTable, eq(tagsTable.id, publicationtagsTable.tagId))
        .where(eq(publicationtagsTable.publicationId, pubId))
}

export const getPublicationsByTags = async (tagIds: number[]) => {
    return await db.select({
        id: publicationsTable.id,
        title: publicationsTable.title,
        content: publicationsTable.content,
        imagePath: publicationsTable.imagePath,
    })
        .from(publicationsTable)
        .innerJoin(
            publicationtagsTable,
            eq(publicationsTable.id, publicationtagsTable.publicationId)
        )
        .where(
            inArray(publicationtagsTable.tagId, tagIds)
        )
        .groupBy(publicationsTable.id) // To avoid duplicates if a publication has multiple matching tags
        .orderBy(desc(publicationsTable.publishedAt));
}

