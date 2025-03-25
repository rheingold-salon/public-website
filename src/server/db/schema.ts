import { date, integer, pgEnum, pgTable, primaryKey, text, time, boolean } from "drizzle-orm/pg-core";

// dates & events
export const eventTypeEnum = pgEnum("event_type", ["event", "vortrag", "podcast", "tv"])

export const eventsTable = pgTable("events", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    titleDe: text().notNull(),
    titleEn: text().notNull(),
    contentDe: text().notNull(),
    contentEn: text().notNull(),
    location: text().notNull(),
    date: date().notNull(),
    time: time().notNull(),
    type: eventTypeEnum().notNull(),
    imagePath: text().notNull(),
    externalLink: text().notNull(),
    highlight: boolean().default(false).notNull()
});

// founder & team
export const peopleTable = pgTable("people", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    roleDe: text().notNull(),
    roleEn: text().notNull(),
    quoteDe: text().notNull(),
    quoteEn: text().notNull(),
    aboutDe: text().notNull(),
    aboutEn: text().notNull(),
    imagePath: text()
});


// references and cases
export const customergroupsTable = pgTable("customers_groups", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    nameDe: text().notNull(),
    nameEn: text().notNull(),
    imagesFolder: text().notNull(),
});


export const referencesTable = pgTable("references", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    contentDe: text().notNull(),
    contentEn: text().notNull(),
    positionDe: text().notNull(),
    positionEn: text().notNull(),
    imagePath: text().notNull()
})

export const casesTable = pgTable("cases", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    titleDe: text().notNull(),
    titleEn: text().notNull(),
    subtitleDe: text().notNull(),
    subtitleEn: text().notNull(),
    contentDe: text().notNull(),
    contentEn: text().notNull(),
    imagePath: text().notNull(),
})


// news & publications
export const publicationsTable = pgTable("publications", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    titleDe: text().notNull(),
    titleEn: text().notNull(),
    publishedAt: date().notNull(),
    author: text().notNull(),
    contentDe: text().notNull(),
    contentEn: text().notNull(),
    imagePath: text().notNull(),
    homePageSlider: boolean().default(false),
    sliderImagePath: text(),
    sliderTextDe: text(),
    sliderTextEn: text()
})

export const tagsTable = pgTable("tags", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    nameDe: text().notNull().unique(),
    nameEn: text().notNull().unique()
})

export const publicationtagsTable = pgTable("publication_tags", {
    publicationId: integer().notNull().references(() => publicationsTable.id, { onDelete: "cascade" }),
    tagId: integer().notNull().references(() => tagsTable.id, { onDelete: "cascade" })
}, (t) => [
    primaryKey({ columns: [t.publicationId, t.tagId] })
],
)

