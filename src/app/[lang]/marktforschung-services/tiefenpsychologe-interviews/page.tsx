import { GrayBox } from "@/components";
import { getDictionary } from "@/dictionaries";
import Image from "next/image";
import { interviewImage } from "@/assets";

export default async function InterviewsPage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.interviewsPage;
    return (
        <>
            <GrayBox heading1={dict.heading1} heading2={dict.heading2}>
                {dict.paragraphs.map((text, index) => {
                    return (
                        <p key={index} className="mt-4">{text}</p>
                    );
                })}
                <Image
                    src={interviewImage}
                    alt="Bild Interview"
                    className="w-full h-72 rounded-tl-[100px] mt-6"
                    style={{
                        objectFit: "cover"
                    }}
                />
            </GrayBox>
        </>

    );
}
