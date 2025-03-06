import { EmbeddedVideo, ImageWithTextBox, GrayBox, PaginatedCards } from "@/components";
import { salonrheingoldLandingImage } from "@/assets";
import { getDictionary } from "@/dictionaries";
import Image from "next/image";
import Link from "next/link";
import { waterImage, jumpImage, salberImage, hammerImage, inhaberImage } from "@/assets";

export default async function SalonRheingoldPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang))

    const [who, we, are] = dict.homePage.whoweare.split(" ");
    const [why, us] = dict.salonRheingoldPage.whyus.split(" ")

    const cardImages = [waterImage, jumpImage, salberImage, hammerImage, inhaberImage];

    const whyusCards = dict.salonRheingoldPage.cards.map((card, index) => ({
        id: index,
        imageSrc: cardImages[index],
        imageAlt: `Bild zu ${card.header}`,
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 font-serif">{card.header}</h3>
                <p className="text-lg">{card.text}</p>
            </>
        )

    }))

    return (
        <>
            <ImageWithTextBox text={dict.salonRheingoldPage.foundingMythText} staticImage={salonrheingoldLandingImage} />
            <GrayBox heading1={dict.salonRheingoldPage.heading1} heading2={dict.salonRheingoldPage.heading2} >
                <p>{dict.salonRheingoldPage.togetherText}</p>
            </GrayBox>

            <div className="grid grid-cols-1 m-10">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center py-4">
                    <div className="flex flex-col md:w-1/2 order-2 md:order-1">
                        <p className='text-salongreen font-bold font-serif text-4xl'>INES</p>
                        <p className='font-bold font-serif text-4xl'>IMDAHL</p>
                        <p className='mt-10 ml-10 text-lg'>{dict.salonRheingoldPage.inesText}</p>
                    </div>
                    <div className="w-64 h-[40rem] relative order-1 md:order-2">
                        <Image
                            src="/static/images/people/Ines-2.jpg"
                            alt="Ines Imdahl"
                            fill={true}
                            sizes="100vw"
                            style={{
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center py-4">
                    <div className="w-64 h-[40rem] relative">
                        <Image
                            src="/static/images/people/Jens-2.jpg"
                            alt="Jens Lönneker"
                            fill={true}
                            sizes="100vw"
                            style={{
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                    <div className="flex flex-col md:w-1/2">
                        <p className='text-right text-salongreen font-bold font-serif text-4xl'>JENS</p>
                        <p className='text-right font-bold font-serif text-4xl'>LÖNNEKER</p>
                        <p className='mt-10 mr-10 text-right text-lg'>{dict.salonRheingoldPage.jensText}</p>
                    </div>
                </div>
            </div>
            <div className="m-10">
                <h1 className="text-center font-bold font-serif text-5xl">{who} <span className='text-salongreen'>{we}</span> {are}</h1>
                {dict.salonRheingoldPage.aboutList.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className="mt-5 font-bold">{item.heading}</p>
                            <p>{item.text}</p>
                        </div>
                    );
                })}
            </div>
            <EmbeddedVideo text={dict.homePage.whoweare} />
            <div className="m-10">
                <h1 className="text-center font-bold font-serif text-5xl mb-8"><span className='text-salongreen'>{why}</span> {us}?</h1>
                <PaginatedCards cards={whyusCards} />
            </div>
            <div className="text-end m-10">
                <h1 className="text-salongreen text-5xl font-bold font-serif">JOBS</h1>
                {dict.salonRheingoldPage.jobs.map((text, index) => {
                    const emails = ["klumpp@rheingold-salon.de", "diefenbach@rheingold-salon.de"];
                    const isLastTwo = index >= dict.salonRheingoldPage.jobs.length - 2;
                    return (
                        <div key={index} className="mt-5">
                            <p>{text}</p>
                            {isLastTwo && <Link
                                href={`mailto:${emails[index - (dict.salonRheingoldPage.jobs.length - 2)]}`}
                                className="underline"
                            ><p>{emails[index - (dict.salonRheingoldPage.jobs.length - 2)]}</p></Link>}
                        </div>
                    );
                })}

            </div>
        </>
    );
}
