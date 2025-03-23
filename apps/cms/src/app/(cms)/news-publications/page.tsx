import { db } from "@/server/db";
import { publicationsTable, tagsTable } from "@rgs/db";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";

export default async function NewsPublicationsPage() {
    const publications = db.select().from(publicationsTable);
    const tags = db.select().from(tagsTable);
    return (
        <div className="m-10">
            <h1 className="mb-4 text-center text-xl font-bold">
                news &amp; publications
            </h1>
            <Tabs defaultValue="publications">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="publications">publications</TabsTrigger>
                    <TabsTrigger value="tags">tags</TabsTrigger>
                </TabsList>
                <TabsContent value="publications"></TabsContent>
            </Tabs>
        </div>
    );
}
