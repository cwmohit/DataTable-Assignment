import DataTable from "@/components/DataTable";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-center text-2xl font-bold m-4">
        Data Table Assignment
      </h1>
      <DataTable />
    </div>
  );
}
