import { getDictionary } from "@/dictionaries";
import { hexagonImage } from "@/assets";
import Image from "next/image";

export default async function OperativePage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.operativePage;
    return (
        <div className="my-24">
            <div className="flex justify-center">
                <p>{dict.hex1}</p>
                <p>{dict.hex2}</p>
            </div>
            <div className="flex justify-around items-center">
                <p>{dict.hex3}</p>
                <Image src={hexagonImage} alt="Hexagon" width={60} height={60} />
                <p>{dict.hex4}</p>
            </div>
            <div className="flex justify-around">
                <p>{dict.hex5}</p>
                <p>{dict.hex6}</p>
            </div>
        </div>
    );
}
