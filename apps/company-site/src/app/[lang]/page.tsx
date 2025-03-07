import { Contact, EmbeddedVideo, ImageWithTextBox, GrayBox } from '@/components';
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
            <GrayBox heading1={dict.heading1} heading2={dict.heading2}>
                <p className="font-bold text-lg">{dict.text}</p>
            </GrayBox>
            <EmbeddedVideo text={dict.whoweare} />
            <Contact
                headerText={dict.contact.headerText}
                personalText={dict.contact.personalText}
                whyDidIClickText={dict.contact.whyDidIClickText}
                dontClickText={dict.contact.dontClickText}
            />
        </>

    );
};
