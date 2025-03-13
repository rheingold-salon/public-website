import { getDictionary } from "@/dictionaries";
import { Hexagon, PaginatedCards } from "@/components";
import { robotImage, handImage, ropeImage, busImage } from "@/assets";

export default async function OperativePage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.operativePage;

    const hexagonPoints = dict.hexagonPoints.map((point) =>
    ({
        label: point.label,
        content: <p>{point.content}</p>,
        position: { x: 0, y: 0 }
    }));

    const images = [robotImage, handImage, ropeImage, busImage];

    const cards = dict.cards.map((card, index) => ({
        id: index,
        imageSrc: images[index],
        imageAlt: `Bild von ${card.header}`,
        content: (
            <>
                <h1 className="font-serif font-bold text-2xl">{card.header}</h1>
                <p>{card.text}</p>
            </>
        )

    }));

    return (
        <>
            <div className="flex justify-center my-24">
                <Hexagon points={hexagonPoints} />
            </div>
            <div className="my-24 md:mx-24">
                <PaginatedCards cards={cards} />
            </div>
        </>
    );
}
