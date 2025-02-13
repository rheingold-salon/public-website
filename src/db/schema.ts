import { date, integer, pgEnum, pgTable, primaryKey, text, time } from "drizzle-orm/pg-core";

// dates & events

const eventTypeEnum = pgEnum("event_type", ["event, vortrag, podcast, tv"])

export const eventsTable = pgTable("events", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    content: text().notNull(),
    location: text().notNull(),
    date: date().notNull(),
    time: time(),
    type: eventTypeEnum().notNull(),
});


// founder & team

export const peopleTable = pgTable("people", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    role_de: text().notNull(),
    role_en: text().notNull(),
    quote_de: text().notNull(),
    quote_en: text().notNull(),
    about_de: text().notNull(),
    about_en: text().notNull(),
    image_path: text()
});


// references and cases

export const customerGroups = pgTable("customers_groups", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name_de: text().notNull(),
    name_en: text().notNull(),
    images_folder: text().notNull(),
});

export const references = pgTable("references", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    content: text().notNull(),
    position: text().notNull(),
    imagePath: text().notNull()
})

export const cases = pgTable("cases", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    subtitle: text().notNull(),
    content: text().notNull(),
    imagePath: text().notNull()
})


// news & publications

export const publications = pgTable("publications", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    author: text().notNull(),
    content: text().notNull(),
    imagePath: text().notNull(),
})

export const tags = pgTable("tags", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull().unique()
})

export const publicationTags = pgTable("publication_tags", {
    publicationId: integer().notNull().references(() => publications.id, { onDelete: "cascade" }),
    tagId: integer().notNull().references(() => tags.id, { onDelete: "cascade" })
}, (t) => [
    primaryKey({ columns: [t.publicationId, t.tagId] })
],
)

