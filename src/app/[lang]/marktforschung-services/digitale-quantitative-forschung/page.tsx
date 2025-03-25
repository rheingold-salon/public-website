import { getDictionary } from "@/dictionaries";
import { QuantBox } from "@/components";

export default async function DigitalPage({
    params,
}: { params: Promise<{ lang: "de" | "en" }> }
) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage.digitalPage;

    return (
        <div className="flex justify-center">
            <div className="my-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
                <QuantBox boxtext="rheingold salon IP-Tracking®" modaltext={dict.modal1} />
                <QuantBox boxtext="rheingold salon Online Diary" modaltext={dict.modal2} />
                <QuantBox boxtext="rheingold salon Digital Imaging®" modaltext={dict.modal3} />
                <QuantBox boxtext="rheingold salon Deep Quant" modaltext={dict.modal4} />
            </div>
        </div>

    );
}
