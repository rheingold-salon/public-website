import { Contact, EmbeddedVideo, HomeSlider, GrayBox, StackedPublications } from '@/components';
import { getDictionary } from '@/dictionaries';
import { homeLandingImage, couchImage } from '@/assets';
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { getPublications, getSliderPublications } from '@rgs/db';

export default async function HomePage({
    params,
}: {
    params: Promise<{ lang: 'en' | 'de' }>
}) {
    const lang = (await params).lang;
    const dict = (await getDictionary(lang)).homePage;

    const lastSpace = dict.couchHeader.lastIndexOf(" ")
    const blackHeader = dict.couchHeader.substring(0, lastSpace);
    const greenHeader = dict.couchHeader.substring(lastSpace);

    const sliderPublications = await getSliderPublications()
    const recentPublications = (await getPublications()).splice(0, 5)


    return (
        <>
            <HomeSlider landingImage={homeLandingImage} landingText={dict.landingImageText} sliderPublications={sliderPublications} lang={lang} />
            <div className="relative w-screen h-screen mt-24">
                {/* Background Image */}
                <Image
                    src={couchImage}
                    alt="Landing Page Background"
                    quality={100}
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                    className='absolute inset-0 w-full'
                />

                {/* Text Overlay Container */}
                <div className="relative z-10 flex items-end justify-end h-full">
                    <div className="relative flex ml-8 mr-8 mb-40 md:mr-40 bg-white p-8 rounded-tr-xl rounded-bl-xl max-w-sm md:max-w-xl">
                        <div className="-ml-16 md:-ml-32 text-right">
                            <p className="font-semibold font-serif text-4xl">{blackHeader}</p>
                            <p className="font-semibold font-serif text-4xl text-salongreen">{greenHeader}</p>
                        </div>
                        <p className="hidden md:inline text-left text-black ml-10">
                            {dict.couchText}
                        </p>
                        <Link href={`/${lang}/marktforschung-services`}
                            className="absolute -bottom-6 -right-6 flex justify-center h-10 w-16 items-center bg-salongreen text-white rounded-tr-lg rounded-bl-lg text-lg">
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
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
            <StackedPublications publications={recentPublications} lang={lang} aktText={dict.aktText} />
        </>

    );
};
