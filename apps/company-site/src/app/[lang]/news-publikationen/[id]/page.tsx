import { getPublicationById, getTagsByPublicationId, getPublicationsByTags } from "@rgs/db";
import Image from "next/image";
import Markdown from "react-markdown";
import { PaginatedPublications } from "@/components";
import { getDictionary } from "@/dictionaries";

export default async function NewsPublikationenPage({ params }: { params: Promise<{ lang: 'de' | 'en', id: number }> }) {
    const pubId = (await params).id;
    const lang = (await params).lang;
    const dict = (await getDictionary(lang)).newsPublicationsPage;
    const [publication] = await getPublicationById(pubId);
    const tags = await getTagsByPublicationId(pubId);
    const tagNames = tags.map((tag) => tag.name).join(", ");
    const tagIds = tags.map((tag) => tag.id);
    const relatedPublications = await getPublicationsByTags(tagIds);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 mb-24">
                {/* Fixed image container with tags - sticky on desktop */}
                <div className="w-full md:w-1/2 md:sticky md:top-36 md:self-start h-fit">
                    <div className="relative aspect-[4/3] w-full">
                        <Image
                            src={`/static/images/publications/${publication.imagePath}`}
                            alt={publication.title}
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
                        {publication.title}
                    </h1>
                    <p className="text-lg mb-6 text-zinc-500">{publication.author}</p>
                    <div className="prose max-w-none">
                        <Markdown
                            components={{
                                p(props) {
                                    const { node, ...rest } = props
                                    return <p style={{ marginBottom: '16px' }} {...rest} ></p>
                                }
                            }}
                        >{publication.content}</Markdown>
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
