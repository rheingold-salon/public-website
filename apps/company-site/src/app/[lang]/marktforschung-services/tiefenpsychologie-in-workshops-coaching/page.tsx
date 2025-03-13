import { GrayBox } from "@/components";
import { getDictionary } from "@/dictionaries";

export default async function CoachingPage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.coachingPage;
    return (
        <>
            <GrayBox heading1={dict.heading1} heading2={dict.heading2}>
                {dict.paragraphs.map((text, index) => {
                    return (
                        <p key={index} className="text-xs md:text-base mt-4">{text}</p>
                    );
                })}
            </GrayBox>
        </>

    );
}
