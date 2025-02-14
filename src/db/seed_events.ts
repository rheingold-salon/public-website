import { db } from "@/db";
import { eventsTable, eventTypeEnum } from "./schema";

const main = async () => {
    const event_gem = {
        titleDe: "29. Markendialog und G·E·M Award 2025",
        titleEn: "29th Brand dialogue and G·E·M Award 2025",
        contentDe: "- How to eat the Big Fish? - Neue Chancen für kleinere Marken durch KI. Die Auswirkungen von Künstlicher Intelligenz sind gigantisch – in ihrer Komplexität vielleicht vergleichbar mit anderen großen technologischen Entwicklungen wie dem Rad oder der Elektrizität. Künstliche Intelligenz wird die Markenführung neu und anders gestalten - von der Insight-Generierung bis hin zur Mediaplanung. Aber wie können Unternehmen diese Möglichkeiten am besten nutzen? Wie wird aus Intelligenz auch Effektivität?",
        contentEn: "- How to eat the Big Fish? - New opportunities for smaller brands through AI. The impact of artificial intelligence is huge - perhaps comparable in its complexity to other major technological developments such as the wheel or electricity. Artificial intelligence will reshape brand management in new and different ways - from insight generation to media planning. But how can companies make the most of these opportunities? How can intelligence be turned into effectiveness?",
        location: "Meta Offices, Berlin",
        date: "2025-03-12",
        time: "18:00:00",
        highlight: true,
        type: eventTypeEnum.enumValues[0],
        imagePath: "gem_awards.webp",
        externalLink: "https://www.gem-online.de/veranstaltungen/markendialog/markendialog-2025"
    }

    await db.delete(eventsTable);
    await db.insert(eventsTable).values(event_gem);

}

main();
