import { GrayBox } from "@/components";
import { getDictionary } from "@/dictionaries";
import Image from "next/image";
import { grundlagenImage, salberImage } from "@/assets";

export default async function MarketResearchPage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.grundlagenPage
    return (
        <>
            <GrayBox heading1={dict.heading1} heading2={dict.heading2} image={salberImage}>
                <p>{dict.grundlagen1}</p>
                <p className="font-bold mt-6">{dict.grundlagen2}</p>
                <p className="font-bold">{dict.list1Header}</p>
                {dict.list1.map((text, index) => {
                    return (
                        <p key={index} className="mt-4 ml-4">{text}</p>
                    );
                })}
                <p className="font-bold mt-6">{dict.list2Header}</p>
                {dict.list2.map((text, index) => {
                    return (
                        <p key={index} className="mt-4 ml-4">{text}</p>
                    );
                })}
            </GrayBox>
            <div className="flex items-stretch mb-16">
                <div className="w-2/3 mx-16">
                    <p className="font-bold">{dict.subheader}</p>
                    {dict.paragraphs.map((text, index) => {
                        return (
                            <p key={index} className="mt-4">{text}</p>
                        );
                    })}
                </div>
                <Image
                    src={grundlagenImage}
                    alt="Deep Dive Grundlagen Bild"
                    className="w-1/4 rounded-tl-[100px]"
                />

            </div>
        </>

    );
}
