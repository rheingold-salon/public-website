import { GrayBox } from "@/components";
import { getDictionary } from "@/dictionaries";
import { markenImage } from "@/assets"
import Image from "next/image";

export default async function MarkenPage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.markenPage;
    return (
        <>
            <GrayBox heading1={dict.heading1} heading2={dict.heading2}>
                {dict.paragraphs.map((text, index) => {
                    return (
                        <p key={index} className="mt-4">{text}</p>
                    );
                })}
                <Image
                    src={markenImage}
                    alt="Bild Markenstrategie"
                    className="w-full h-72 rounded-tl-[100px] mt-6"
                    style={{
                        objectFit: "cover"
                    }}
                />
            </GrayBox>
        </>

    );
}
