import { CustomerGroupCell, ProgressPagination } from "@/components";
import { db } from "@/db";
import { customergroupsTable, referencesTable } from "@/db/schema";

export default async function ReferenzenCasesPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const lang = (await params).lang

    const customerGroups = await db.select().from(customergroupsTable);
    const references = await db.select().from(referencesTable);

    return (
        <div className="pt-28 flex justify-center">
            <div className="w-full max-w-7xl px-4">
                <h1 className="font-bold text-4xl text-center mb-8">kunden</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {customerGroups?.map((customerGroup) => (
                        <CustomerGroupCell
                            key={customerGroup.id}
                            customerGroup={{
                                name: lang === 'de' ? customerGroup.nameDe : customerGroup.nameEn,
                                imagesFolder: customerGroup.imagesFolder
                            }} />

                    ))}
                    <h1 className="font-bold text-4xl text-center mt-24 mb-8">referenzen</h1>
                    <ProgressPagination />
                    <h1 className="font-bold text-4xl text-center mt-24 mb-8">cases</h1>
                    <ProgressPagination />
                </div>
            </div>
        </div>
    );
}

