import { useState } from "react";
import CustomerSearch from "./CustomerSearch";
import CustomerTable from "./CustomerTable";
import CRUDButtons from "./CRUDButtons";
import CustomerDetailsModal from "./CustomerDetailsModal";
import CustomerFormModal from "./CustomerFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { type Customer } from "../../../types/Customer";

export default function CustomersDashboard() {
    const [query, setQuery] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleSelectRow = (customer: Customer) => {
        setSelectedCustomer(customer);
        setDetailsOpen(true);
    };

    const handleRefresh = () => setRefreshKey((k) => k + 1);

    return (
        <div className="h-screen w-screen">

            <h1 className="uppercase font-['BebasNeue'] text-6xl">
                Kunden
            </h1>

            <div className="mt-6 flex w-[90%] items-center justify-between">

                <CustomerSearch
                    onSearch={setQuery}
                    onReset={() => setQuery("")}
                />

                <CRUDButtons
                    selectedCustomer={selectedCustomer}
                    onCreate={() => setCreateOpen(true)}
                    onDelete={() => setDeleteOpen(true)}
                />

            </div>

            <div className="mt-6">
                <CustomerTable
                    query={query}
                    refreshKey={refreshKey}
                    onSelect={handleSelectRow}
                />
            </div>

            {detailsOpen && (
                <CustomerDetailsModal
                    customer={selectedCustomer}
                    onClose={() => setDetailsOpen(false)}
                />
            )}

            {createOpen && (
                <CustomerFormModal
                    onClose={() => setCreateOpen(false)}
                    onSuccess={handleRefresh}
                />
            )}

            {deleteOpen && selectedCustomer && (
                <DeleteConfirmModal
                    customer={selectedCustomer}
                    onClose={() => setDeleteOpen(false)}
                    onSuccess={() => {
                        setSelectedCustomer(null);
                        handleRefresh();
                    }}
                />
            )}

        </div>
    );
}