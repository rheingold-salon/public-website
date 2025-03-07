import { GrayBox } from "@/components";
import { getDictionary } from "@/dictionaries";
import { gdsImage } from "@/assets";

export default async function GdPage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.gdPage;
    return (
        <>
            <GrayBox heading1={dict.heading1} heading2={dict.heading2} image={gdsImage}>
                {dict.paragraphs.map((text, index) => {
                    return (
                        <p key={index} className="mt-4">{text}</p>
                    );
                })}
            </GrayBox>
        </>

    );
}
