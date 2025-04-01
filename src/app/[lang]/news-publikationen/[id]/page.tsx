import { getPublicationById, getTagsByPublicationId, getSimilarPublications } from "@/server/db/read-actions";
import Image from "next/image";
import Markdown from "react-markdown";
import { PaginatedPublications } from "../PaginatedPublications";
import { getDictionary } from "@/dictionaries";
import { env } from "@/env";

export default async function NewsPublikationenPage({ params }: { params: Promise<{ lang: 'de' | 'en', id: number }> }) {
    const pubId = (await params).id;
    const lang = (await params).lang;
    const dict = (await getDictionary(lang)).newsPublicationsPage;
    const [publication] = await getPublicationById(pubId);
    const tags = await getTagsByPublicationId(lang, pubId);
    const tagNames = tags.map((tag) => tag.name).join(", ");
    const tagIds = tags.map((tag) => tag.id);
    const relatedPublications = await getSimilarPublications(lang, tagIds, pubId);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 mb-24">
                {/* Fixed image container with tags - sticky on desktop */}
                <div className="w-full md:w-1/2 md:sticky md:top-36 md:self-start h-fit">
                    <div className="relative aspect-[4/3] w-full">
                        <Image
                            src={`${env.NEXT_PUBLIC_IMAGE_SERVER_URL}/static/images/publications/${publication.imagePath}`}
                            alt={lang === "de" ? publication.titleDe : publication.titleEn}
                            quality={100}
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                            priority
                        />
                    </div>
                    <p>{tagNames}</p>

                </div>

                {/* Scrollable content */}
                <div className="w-full md:w-1/2">
                    <h1 className="font-bold font-serif text-left text-black text-2xl md:text-6xl mb-6">
                        {lang === "de" ? publication.titleDe : publication.titleEn}
                    </h1>
                    <p className="text-lg mb-6 text-zinc-500">{publication.author}</p>
                    <div className="prose max-w-none">
                        <Markdown
                            components={{
                                p(props) {
                                    return <p style={{ marginBottom: '16px' }} {...props} ></p>
                                }
                            }}
                        >{lang === "de" ? publication.contentDe : publication.contentEn}</Markdown>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="mb-4 text-center font-bold text-4xl font-serif">{dict.relatedText}</h1>
                <PaginatedPublications lang={lang} cards={relatedPublications}></PaginatedPublications>
            </div>
        </div>
    );
}
