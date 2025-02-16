import { db } from "@/db";
import { eventsTable, eventTypeEnum } from "./schema";

const main = async () => {
    const events = [
        // event type
        {
            titleDe: "Zukunft der Markenführung 2025",
            titleEn: "Future of Brand Management 2025",
            contentDe: "Ein Blick in die Zukunft der Markenstrategien mit KI.",
            contentEn: "A look into the future of brand strategies with AI.",
            location: "Munich Conference Center",
            date: "2025-05-20",
            time: "15:00:00",
            type: eventTypeEnum.enumValues[0],
            imagePath: "brand_future.webp",
            externalLink: "https://example.com/brand-future-2026"
        },
        {
            titleDe: "Rückblick: Markenstrategie 2024",
            titleEn: "Review: Brand Strategy 2024",
            contentDe: "Analyse der erfolgreichsten Markenstrategien des Jahres 2024.",
            contentEn: "Analysis of the most successful brand strategies of 2024.",
            location: "Hamburg Convention Hall",
            date: "2025-02-03",
            time: "14:00:00",
            type: eventTypeEnum.enumValues[0],
            imagePath: "brand_review.webp",
            externalLink: "https://example.com/brand-review-2024"
        },
        // vortrag type
        {
            titleDe: "KI und Ethik in der Werbung",
            titleEn: "AI and Ethics in Advertising",
            contentDe: "Diskussion über die ethischen Herausforderungen der KI-gestützten Werbung.",
            contentEn: "Discussion on the ethical challenges of AI-driven advertising.",
            location: "Berlin AI Hub",
            date: "2025-09-15",
            time: "10:00:00",
            type: eventTypeEnum.enumValues[1],
            imagePath: "ai_ethics.webp",
            externalLink: "https://example.com/ai-ethics-advertising"
        },
        {
            titleDe: "Vergangene KI-Trends 2023",
            titleEn: "Past AI Trends 2023",
            contentDe: "Ein Rückblick auf die wichtigsten Entwicklungen in der KI-Technologie.",
            contentEn: "A retrospective on major developments in AI technology.",
            location: "Frankfurt Tech Forum",
            date: "2025-01-01",
            time: "16:00:00",
            type: eventTypeEnum.enumValues[1],
            imagePath: "ai_trends_2023.webp",
            externalLink: "https://example.com/ai-trends-2023"
        },
        // podcast type
        {
            titleDe: "KI im Alltag - Zukunft oder Hype?",
            titleEn: "AI in Everyday Life - Future or Hype?",
            contentDe: "Podcast über die tatsächlichen Auswirkungen von KI auf den Alltag.",
            contentEn: "Podcast on the real impact of AI on everyday life.",
            location: "Online",
            date: "2025-04-05",
            time: "08:00:00",
            type: eventTypeEnum.enumValues[2],
            imagePath: "ai_everyday.webp",
            externalLink: "https://example.com/ai-everyday-podcast"
        },
        {
            titleDe: "Die besten Marketing-Podcasts 2024",
            titleEn: "Best Marketing Podcasts 2024",
            contentDe: "Zusammenfassung und Bewertung der besten Marketing-Podcasts.",
            contentEn: "Summary and review of the best marketing podcasts.",
            location: "Online",
            date: "2025-02-13",
            time: "12:00:00",
            type: eventTypeEnum.enumValues[2],
            imagePath: "marketing_podcasts.webp",
            externalLink: "https://example.com/best-marketing-podcasts"
        },
        // tv type
        {
            titleDe: "KI in den Nachrichten 2025",
            titleEn: "AI in the News 2025",
            contentDe: "Fernsehbericht über die neuesten Entwicklungen in der KI.",
            contentEn: "TV report on the latest developments in AI.",
            location: "ARD Studios, Berlin",
            date: "2025-06-10",
            time: "20:15:00",
            type: eventTypeEnum.enumValues[3],
            imagePath: "ai_news_2025.webp",
            externalLink: "https://example.com/ai-news-2025"
        },
        {
            titleDe: "Rückblick auf die Tech-News 2023",
            titleEn: "Tech News Recap 2023",
            contentDe: "Zusammenfassung der wichtigsten technologischen Entwicklungen 2023.",
            contentEn: "Summary of the key technological developments of 2023.",
            location: "ZDF Studios, Mainz",
            date: "2025-01-20",
            time: "19:30:00",
            type: eventTypeEnum.enumValues[3],
            imagePath: "tech_news_2023.webp",
            externalLink: "https://example.com/tech-news-recap-2023"
        }
    ];

    await db.delete(eventsTable);
    await db.insert(eventsTable).values(events);
};

main();
