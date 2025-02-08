import { EmbeddedVideo, ImageWithTextBox } from "@/components";
import { salonrheingoldLandingImage } from "@/assets";
import { getDictionary } from "@/dictionaries";

export default async function SalonRheingoldPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang))

    return (
        <>
            <ImageWithTextBox text={dict.salonRheingoldPage.foundingMythText} staticImage={salonrheingoldLandingImage} />
            <EmbeddedVideo />
        </>
    );
}
