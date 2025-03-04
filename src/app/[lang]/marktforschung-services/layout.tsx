import { ImageWithTextBox } from "@/components";
import { strategyLandingImage } from "@/assets";
import { getDictionary } from "@/dictionaries";

export default async function MarktforschungServicesLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode,
    params: Promise<{ lang: "de" | "en" }>
}>) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).marketResearchPage;
    return (
        <>
            <ImageWithTextBox text={dict.strategyText} staticImage={strategyLandingImage} />
            {children}
        </>


    );
};

