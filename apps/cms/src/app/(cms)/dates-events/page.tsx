import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getEvents } from "@/server/db/events-crud";

export default async function DatesEventsPage() {
  const result = await getEvents();
  if (result.error)
    return <div className="text-center font-bold">Error: {result.error}</div>;
  return (
    <div className="m-10">
      <h1 className="mb-4 text-center text-xl font-bold">dates &amp; events</h1>
      <DataTable columns={columns} data={result.data!} />
    </div>
  );
}
