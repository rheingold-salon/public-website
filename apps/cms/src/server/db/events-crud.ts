"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from ".";
import { eventsTable, type eventTypeEnum } from "@rgs/db";
import { createEventSchema, updateEventSchema } from "@/lib/zod"; // Adjust import path as needed

/**
 * Get all events
 */
export async function getEvents() {
    try {
        const events = await db
            .select()
            .from(eventsTable)
            .orderBy(eventsTable.date);
        return { success: true, data: events };
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return { success: false, error: "Failed to fetch events" };
    }
}

/**
 * Get a single event by ID
 */
export async function getEventById(id: number) {
    try {
        const [event] = await db
            .select()
            .from(eventsTable)
            .where(eq(eventsTable.id, id));

        if (!event) {
            return { success: false, error: "Event not found" };
        }

        return { success: true, data: event };
    } catch (error) {
        console.error(`Failed to fetch event with ID ${id}:`, error);
        return { success: false, error: "Failed to fetch event" };
    }
}

/**
 * Create a new event
 */
export async function createEvent(formData: FormData) {
    // Convert FormData to plain object
    const rawData = Object.fromEntries(formData.entries());

    // Handle boolean values (checkboxes)
    const highlight =
        formData.get("highlight") === "on" || formData.get("highlight") === "true";

    // Create an object for validation
    const eventData = {
        titleDe: rawData.titleDe as string,
        titleEn: rawData.titleEn as string,
        contentDe: rawData.contentDe as string,
        contentEn: rawData.contentEn as string,
        location: rawData.location as string,
        date: rawData.date as string,
        time: rawData.time as string,
        type: rawData.type as (typeof eventTypeEnum.enumValues)[number],
        imagePath: rawData.imagePath as string,
        externalLink: rawData.externalLink as string,
        highlight,
    };

    // Validate the data
    const validationResult = createEventSchema.safeParse(eventData);

    if (!validationResult.success) {
        console.error("Validation error:", validationResult.error.format());
        return {
            success: false,
            error: "Validation failed",
            validationErrors: validationResult.error.format(),
        };
    }

    try {
        // Insert the event into the database
        const [newEvent] = await db
            .insert(eventsTable)
            .values(validationResult.data)
            .returning();

        // Revalidate the events page
        revalidatePath("/dates-events");

        return { success: true, data: newEvent };
    } catch (error) {
        console.error("Failed to create event:", error);
        return { success: false, error: "Failed to create event" };
    }
}

/**
 * Update an existing event
 */
export async function updateEvent(id: number, formData: FormData) {
    // Convert FormData to plain object
    const rawData = Object.fromEntries(formData.entries());

    // Handle boolean values (checkboxes)
    const highlight =
        formData.get("highlight") === "on" || formData.get("highlight") === "true";

    // Create an object for validation
    const eventData = {
        titleDe: rawData.titleDe as string,
        titleEn: rawData.titleEn as string,
        contentDe: rawData.contentDe as string,
        contentEn: rawData.contentEn as string,
        location: rawData.location as string,
        date: rawData.date as string,
        time: rawData.time as string,
        type: rawData.type as (typeof eventTypeEnum.enumValues)[number],
        imagePath: rawData.imagePath as string,
        externalLink: rawData.externalLink as string,
        highlight,
    };

    // Validate the data
    const validationResult = updateEventSchema.safeParse(eventData);

    if (!validationResult.success) {
        console.error("Validation error:", validationResult.error.format());
        return {
            success: false,
            error: "Validation failed",
            validationErrors: validationResult.error.format(),
        };
    }

    try {
        // Update the event in the database
        const [updatedEvent] = await db
            .update(eventsTable)
            .set(validationResult.data)
            .where(eq(eventsTable.id, id))
            .returning();

        if (!updatedEvent) {
            return { success: false, error: "Event not found" };
        }

        // Revalidate the events page
        revalidatePath("/dates-events");

        return { success: true, data: updatedEvent };
    } catch (error) {
        console.error(`Failed to update event with ID ${id}:`, error);
        return { success: false, error: "Failed to update event" };
    }
}

/**
 * Delete an event
 */
export async function deleteEvent(id: number) {
    try {
        const [deletedEvent] = await db
            .delete(eventsTable)
            .where(eq(eventsTable.id, id))
            .returning();

        if (!deletedEvent) {
            return { success: false, error: "Event not found" };
        }

        // Revalidate the events page
        revalidatePath("/dates-events");

        return { success: true, data: deletedEvent };
    } catch (error) {
        console.error(`Failed to delete event with ID ${id}:`, error);
        return { success: false, error: "Failed to delete event" };
    }
}
