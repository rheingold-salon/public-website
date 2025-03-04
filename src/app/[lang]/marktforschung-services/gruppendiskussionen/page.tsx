import { GrayBox } from "@/components";
import { getDictionary } from "@/dictionaries";

export default async function GDPage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.gdPage;
    return (
        <>
            <GrayBox heading1={dict.heading1} heading2={dict.heading2}>
                <p>{dict.gd1}</p>
                <p className="mt-4">{dict.gd2}</p>
                <p className="mt-4">{dict.gd3}</p>
                <p className="mt-4">{dict.gd4}</p>
            </GrayBox>
        </>

    );
}
