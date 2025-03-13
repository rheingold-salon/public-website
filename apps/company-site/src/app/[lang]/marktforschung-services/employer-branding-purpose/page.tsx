import { GrayBox } from "@/components";
import { getDictionary } from "@/dictionaries";
import { purpose1Image, purpose2Image } from "@/assets";
import Image from "next/image";

export default async function PurposePage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.purposePage;
    return (
        <>
            <GrayBox heading1={dict.heading1} heading2={dict.heading2} image={purpose1Image}>
                <div className="text-xs md:text-base">
                    <p className="font-bold">{dict.subheading}</p>
                    {dict.paragraphs.map((text, index) => {
                        return (
                            <p key={index} className="mt-4">{text}</p>
                        );
                    })}
                </div>
            </GrayBox>
            <div className="flex items-center mb-16">
                <div className="text-xs md:text-base w-2/3 mx-16">
                    <p className="font-bold">{dict.subheading2}</p>
                    {dict.paragraphs2.map((text, index) => {
                        return (
                            <p key={index} className="mt-4">{text}</p>
                        );
                    })}
                </div>
                <Image
                    src={purpose2Image}
                    alt="Deep Dive Grundlagen Bild"
                    className="w-1/4 min-h-96 max-h-96 rounded-tl-[100px]"
                    style={{
                        objectPosition: "center",
                        objectFit: "cover"
                    }}
                />
            </div>
        </>

    );
}
