import { CustomerGroupCell, PaginatedCards } from "@/components";
import { getDictionary } from "@/dictionaries";
import { db, customergroupsTable, referencesTable, casesTable } from "@/server/db";
import Markdown from "react-markdown";

export default async function ReferenzenCasesPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).referencesCasesPage;

    const customerGroups = await db.select().from(customergroupsTable);

    const references = (await db.select().from(referencesTable)).map((reference) => ({
        id: reference.id,
        name: reference.name,
        content: lang === "de" ? reference.contentDe : reference.contentEn,
        position: lang === "de" ? reference.positionDe : reference.positionEn,
        imagePath: reference.imagePath,
    }));

    const referencesCards = references.map((reference) => ({
        id: reference.id,
        imageSrc: `/static/images/references/${reference.imagePath}`,
        imageAlt: `Bild von ${reference.name}`,
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 font-serif">{reference.name}</h3>
                <p className="text-lg">{reference.content}</p>
                <p className="text-zinc-500 mt-8">{reference.position}</p>
            </>
        )
    }))

    const cases = (await db.select().from(casesTable).orderBy(casesTable.id)).map((c) => ({
        id: c.id,
        title: lang === "de" ? c.titleDe : c.titleEn,
        subtitle: lang === "de" ? c.subtitleDe : c.subtitleEn,
        content: lang === "de" ? c.contentDe : c.contentEn,
        imagePath: c.imagePath,
    }));


    const casesCards = cases.map((c) => ({
        id: c.id,
        imageSrc: `/static/images/cases/${c.imagePath}`,
        imageAlt: `Bild von ${c.title}`,
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 font-serif">{c.title}</h3>
                <h3 className="text-lg font-semibold mb-2 font-serif text-salongreen">{c.subtitle}</h3>
                <Markdown
                    components={{
                        p(props) {
                            const { node, ...rest } = props
                            return <p style={{ marginBottom: '16px' }} {...rest} ></p>
                        }
                    }}
                >{c.content}</Markdown>
            </>
        )

    }));

    return (
        <div className="pt-28 flex justify-center">
            <div className="w-full max-w-7xl px-4">
                <h1 className="font-serif font-bold text-4xl text-center mb-8">{dict.customers}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {customerGroups?.map((customerGroup) => (
                        <CustomerGroupCell
                            key={customerGroup.id}
                            customerGroup={{
                                name: lang === 'de' ? customerGroup.nameDe : customerGroup.nameEn,
                                imagesFolder: customerGroup.imagesFolder
                            }} />

                    ))}
                </div>
                <div className="my-24">
                    <h1 className="font-serif font-bold text-4xl text-center mb-8">{dict.references}</h1>
                    <PaginatedCards cards={referencesCards} />
                </div>
                <div className="my-24">
                    <h1 className="font-serif font-bold text-4xl text-center mb-8">cases</h1>
                    <PaginatedCards cards={casesCards} />
                </div>
            </div>
        </div>
    );
}

