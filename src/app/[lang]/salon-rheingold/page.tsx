import { EmbeddedVideo, ImageWithTextBox } from "@/components";
import { salonrheingoldLandingImage } from "@/assets";

export default function SalonRheingoldPage() {
    const mythosText = "Jedes Unternehmen braucht einen Gründungsmythos - hier ist unserer zur Marktforschung in Köln:";
    return (
        <>
            <ImageWithTextBox text={mythosText} staticImage={salonrheingoldLandingImage} />
            <EmbeddedVideo />
        </>
    );
}
