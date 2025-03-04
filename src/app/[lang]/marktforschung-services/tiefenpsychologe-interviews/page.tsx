import { GrayBox } from "@/components";
import { getDictionary } from "@/dictionaries";

export default async function InterviewsPage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.interviewsPage
    return (
        <>
            <GrayBox heading1={dict.heading1} heading2={dict.heading2}>
                <p>{dict.interviews1}</p>
                <p className="mt-6">{dict.interviews2}</p>
            </GrayBox>
        </>

    );
}
