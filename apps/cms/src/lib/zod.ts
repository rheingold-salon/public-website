import { object, string, number, boolean, z } from "zod"

// Existing schema
export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email")
        .refine((email) => email.endsWith("@rheingold.intern"), {
            message: "Email must be from the rheingold.intern domain",
        }),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .max(32, "Password must be less than 32 characters"),
})

// Event type enum
export const eventTypeEnum = z.enum(["event", "vortrag", "podcast", "tv"]);

// Events schema
export const eventsSchema = object({
    id: number().optional(),
    titleDe: string({ required_error: "German title is required" }).min(1, "German title is required"),
    titleEn: string({ required_error: "English title is required" }).min(1, "English title is required"),
    contentDe: string({ required_error: "German content is required" }).min(1, "German content is required"),
    contentEn: string({ required_error: "English content is required" }).min(1, "English content is required"),
    location: string({ required_error: "Location is required" }).min(1, "Location is required"),
    date: z.string({ required_error: "Date is required" }).date("Date must be in YYYY-MM-DD format."),
    time: string({ required_error: "Time is required" }).regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, "Time must be in HH:MM format"),
    type: eventTypeEnum,
    imagePath: string({ required_error: "Image path is required" }).min(1, "Image path is required"),
    externalLink: string({ required_error: "External link is required" }).min(1, "External link is required"),
    highlight: boolean().default(false)
});

// People schema
export const peopleSchema = object({
    id: number().optional(),
    name: string({ required_error: "Name is required" }).min(1, "Name is required"),
    roleDe: string({ required_error: "German role is required" }).min(1, "German role is required"),
    roleEn: string({ required_error: "English role is required" }).min(1, "English role is required"),
    quoteDe: string({ required_error: "German quote is required" }).min(1, "German quote is required"),
    quoteEn: string({ required_error: "English quote is required" }).min(1, "English quote is required"),
    aboutDe: string({ required_error: "German about is required" }).min(1, "German about is required"),
    aboutEn: string({ required_error: "English about is required" }).min(1, "English about is required"),
    imagePath: string().optional()
});

// Customer groups schema
export const customergroupsSchema = object({
    id: number().optional(),
    nameDe: string({ required_error: "German name is required" }).min(1, "German name is required"),
    nameEn: string({ required_error: "English name is required" }).min(1, "English name is required"),
    imagesFolder: string({ required_error: "Images folder is required" }).min(1, "Images folder is required")
});

// References schema
export const referencesSchema = object({
    id: number().optional(),
    name: string({ required_error: "Name is required" }).min(1, "Name is required"),
    contentDe: string({ required_error: "German content is required" }).min(1, "German content is required"),
    contentEn: string({ required_error: "English content is required" }).min(1, "English content is required"),
    positionDe: string({ required_error: "German position is required" }).min(1, "German position is required"),
    positionEn: string({ required_error: "English position is required" }).min(1, "English position is required"),
    imagePath: string({ required_error: "Image path is required" }).min(1, "Image path is required")
});

// Cases schema
export const casesSchema = object({
    id: number().optional(),
    titleDe: string({ required_error: "German title is required" }).min(1, "German title is required"),
    titleEn: string({ required_error: "English title is required" }).min(1, "English title is required"),
    subtitleDe: string({ required_error: "German subtitle is required" }).min(1, "German subtitle is required"),
    subtitleEn: string({ required_error: "English subtitle is required" }).min(1, "English subtitle is required"),
    contentDe: string({ required_error: "German content is required" }).min(1, "German content is required"),
    contentEn: string({ required_error: "English content is required" }).min(1, "English content is required"),
    imagePath: string({ required_error: "Image path is required" }).min(1, "Image path is required")
});

// Publications schema
export const publicationsSchema = object({
    id: number().optional(),
    titleDe: string({ required_error: "German title is required" }).min(1, "German title is required"),
    titleEn: string({ required_error: "English title is required" }).min(1, "English title is required"),
    publishedAt: z.string({ required_error: "Published date is required" }).date("Date must be in YYYY-MM-DD format"),
    author: string({ required_error: "Author is required" }).min(1, "Author is required"),
    contentDe: string({ required_error: "German content is required" }).min(1, "German content is required"),
    contentEn: string({ required_error: "English content is required" }).min(1, "English content is required"),
    imagePath: string({ required_error: "Image path is required" }).min(1, "Image path is required"),
    homePageSlider: boolean().default(false),
    sliderImagePath: string().optional(),
    sliderTextDe: string().optional(),
    sliderTextEn: string().optional()
});

// Tags schema
export const tagsSchema = object({
    id: number().optional(),
    nameDe: string({ required_error: "German name is required" }).min(1, "German name is required"),
    nameEn: string({ required_error: "English name is required" }).min(1, "English name is required")
});

// Publication tags schema
export const publicationtagsSchema = object({
    publicationId: number({ required_error: "Publication ID is required" }),
    tagId: number({ required_error: "Tag ID is required" })
});

// Schemas for form validation and frontend use
export const createEventSchema = eventsSchema.omit({ id: true });
export const updateEventSchema = eventsSchema.partial()

export const createPersonSchema = peopleSchema.omit({ id: true });
export const updatePersonSchema = peopleSchema.partial().extend({
    id: number({ required_error: "ID is required for updates" })
});

export const createCustomergroupSchema = customergroupsSchema.omit({ id: true });
export const updateCustomergroupSchema = customergroupsSchema.partial().extend({
    id: number({ required_error: "ID is required for updates" })
});

export const createReferenceSchema = referencesSchema.omit({ id: true });
export const updateReferenceSchema = referencesSchema.partial().extend({
    id: number({ required_error: "ID is required for updates" })
});

export const createCaseSchema = casesSchema.omit({ id: true });
export const updateCaseSchema = casesSchema.partial().extend({
    id: number({ required_error: "ID is required for updates" })
});

export const createPublicationSchema = publicationsSchema.omit({ id: true });
export const updatePublicationSchema = publicationsSchema.partial().extend({
    id: number({ required_error: "ID is required for updates" })
});

export const createTagSchema = tagsSchema.omit({ id: true });
export const updateTagSchema = tagsSchema.partial().extend({
    id: number({ required_error: "ID is required for updates" })
});

export const createPublicationTagSchema = publicationtagsSchema;

// Type inference for TypeScript
export type Event = z.infer<typeof eventsSchema>;
export type Person = z.infer<typeof peopleSchema>;
export type CustomerGroup = z.infer<typeof customergroupsSchema>;
export type Reference = z.infer<typeof referencesSchema>;
export type Case = z.infer<typeof casesSchema>;
export type Publication = z.infer<typeof publicationsSchema>;
export type Tag = z.infer<typeof tagsSchema>;
export type PublicationTag = z.infer<typeof publicationtagsSchema>;
