import CustomerTable from "./CustomerTable"

export default function CustomersDashboard() {
    return <div className="h-screen w-screen">
        <h1 className="uppercase font-['BebasNeue'] text-6xl">Kunden</h1>

        <CustomerTable />
    </div>
}