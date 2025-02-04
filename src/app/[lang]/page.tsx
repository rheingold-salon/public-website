import { ImageWithTextBox } from '@/components';
import { Contact, EmbeddedVideo } from '@/components';
import { getDictionary } from '@/dictionaries';

export default async function HomePage({
    params,
}: {
    params: Promise<{ lang: 'en' | 'de' }>
}) {
    const lang = (await params).lang;
    const dict = (await getDictionary(lang)).homePage;

    return (
        <>
            <ImageWithTextBox text={dict.landingImageText} imagePath='/landingpage.jpg' />
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
