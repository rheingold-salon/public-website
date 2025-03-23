import { peopleTable } from "@rgs/db";
import { db } from "@/server/db";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";

export default async function ReferencesCasesPage() {
  const data = await db.select().from(peopleTable);
  return (
    <div className="m-10">
      <h1 className="mb-4 text-center text-xl font-bold">
        references &amp; cases
      </h1>
      <Tabs defaultValue="customer-groups">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customer-groups">customer groups</TabsTrigger>
          <TabsTrigger value="references">references</TabsTrigger>
          <TabsTrigger value="cases">cases</TabsTrigger>
        </TabsList>
        <TabsContent value="references"></TabsContent>
      </Tabs>
    </div>
  );
}
