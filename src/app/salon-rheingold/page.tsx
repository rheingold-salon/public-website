import { EmbeddedVideo, ImageWithTextBox } from "@/components";

export default function SalonRheingoldPage() {
    const mythosText = "Jedes Unternehmen braucht einen Gründungsmythos - hier ist unserer zur Marktforschung in Köln:";
    return (
        <>
            <ImageWithTextBox text={mythosText} imagePath="/salonrheingold.jpg" />
            <EmbeddedVideo />
        </>
    );
}
