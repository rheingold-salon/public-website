import { CustomerGroupCell, PaginatedCards } from "@/components";
import { db, customergroupsTable, referencesTable, casesTable } from "@rgs/db";

export default async function ReferenzenCasesPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang

    const customerGroups = await db.select().from(customergroupsTable);
    const references = await db.select().from(referencesTable);
    const cases = await db.select().from(casesTable);

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

    const casesCards = [];

    return (
        <div className="pt-28 flex justify-center">
            <div className="w-full max-w-7xl px-4">
                <h1 className="font-serif font-bold text-4xl text-center mb-8">kunden</h1>
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
                    <h1 className="font-serif font-bold text-4xl text-center mb-8">referenzen</h1>
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

