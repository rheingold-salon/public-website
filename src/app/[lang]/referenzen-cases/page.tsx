import { createClient } from "@/utils/supabase/server";
import { CustomerGroupCell, ProgressPagination } from "@/components";

export default async function ReferenzenCasesPage() {
    const supabase = await createClient();
    const { data: customerGroups } = await supabase.from("customer_groups").select();

    return (
        <div className="pt-28 flex justify-center">
            <div className="w-full max-w-7xl px-4">
                <h1 className="font-bold text-4xl text-center mb-8">Kunden</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {customerGroups?.map((customerGroup) => (
                        <CustomerGroupCell key={customerGroup.id} customerGroup={customerGroup}/>
                    ))}
                </div>
            <ProgressPagination />
            </div>
        </div>
    );
}
