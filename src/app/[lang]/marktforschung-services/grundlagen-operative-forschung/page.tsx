import { getDictionary } from "@/dictionaries";
import { Hexagon } from "@/components";

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

    return (
        <div className="flex justify-center my-24">
            <Hexagon points={hexagonPoints} />
        </div>
    );
}
