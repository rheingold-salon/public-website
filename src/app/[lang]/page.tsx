import { ImageWithTextBox } from '@/components';
import { Contact, EmbeddedVideo } from '@/components';
import { getDictionary } from '@/dictionaries';
import { homeLandingImage } from '@/assets';

export default async function HomePage({
    params,
}: {
    params: Promise<{ lang: 'en' | 'de' }>
}) {
    const lang = (await params).lang;
    const dict = (await getDictionary(lang)).homePage;

    return (
        <>
            <ImageWithTextBox text={dict.landingImageText} staticImage={homeLandingImage} />
            <EmbeddedVideo />
            <Contact
                headerText={dict.contact.headerText}
                personalText={dict.contact.personalText}
                whyDidIClickText={dict.contact.whyDidIClickText}
                dontClickText={dict.contact.dontClickText}
            />
        </>

    );
};
