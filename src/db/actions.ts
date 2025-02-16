'use server'

import { and, eq, sql, lt, gte, desc } from "drizzle-orm"
import { db } from "@/db";
import { eventsTable } from "./schema";

export const getPastEvents = async (lang: 'de' | 'en', eventType) => {
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

export const getFutureEvents = async (lang: 'de' | 'en', eventType) => {
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
