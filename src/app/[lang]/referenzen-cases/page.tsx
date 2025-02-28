import { CustomerGroupCell, ProgressPagination } from "@/components";
import { db } from "@/db";
import { customergroupsTable } from "@/db/schema";

export default async function ReferenzenCasesPage({ params }: { params: Promise<{ lang: 'de' | 'en' }> }) {
    const customerGroups = await db.select().from(customergroupsTable);
    const lang = (await params).lang

    return (
        <div className="pt-28 flex justify-center">
            <div className="w-full max-w-7xl px-4">
                <h1 className="font-bold text-4xl text-center mb-8">Kunden</h1>
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
                <ProgressPagination />
            </div>
        </div>
    );
}
