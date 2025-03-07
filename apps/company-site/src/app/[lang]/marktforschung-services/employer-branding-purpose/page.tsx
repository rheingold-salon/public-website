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
                <p className="font-bold">{dict.subheading}</p>
                {dict.paragraphs.map((text, index) => {
                    return (
                        <p key={index} className="mt-4">{text}</p>
                    );
                })}
            </GrayBox>
            <div className="flex items-stretch mb-16">
                <div className="w-2/3 mx-16">
                    <p className="font-bold">{dict.subheading2}</p>
                    {dict.paragraphs2.map((text, index) => {
                        return (
                            <p key={index} className="mt-4">{text}</p>
                        );
                    })}
                </div>
                <Image
                    src={purpose2Image}
                    alt="Purpose Bild (Auge Blatt)"
                    className="w-1/4 rounded-tl-[100px]"
                />

            </div>
        </>

    );
}
