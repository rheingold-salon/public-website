import { GrayBox } from "@/components";
import { getDictionary } from "@/dictionaries";
import { prImage } from "@/assets";
import Link from "next/link";

export default async function PrPage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.prPage;
    return (
        <>
            <GrayBox heading1={dict.heading1} heading2={dict.heading2} image={prImage}>
                <p>{dict.p1}
                    <Link className="underline font-bold" href="https://www.ikw-jugendstudie.org/" target="_blank">{dict.a1}</Link> {dict.p2}
                    <Link className="underline font-bold" href="https://www.rheingold-salon.de/gehoerte-freiheit-podcast-krise/" target="_blank">{dict.a2}</Link> {dict.p3}
                </p>
                <p className="mt-4">{dict.p4}</p>
            </GrayBox>
        </>

    );
}
