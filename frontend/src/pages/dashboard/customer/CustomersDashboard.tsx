import { useState } from "react";
import CustomerSearch from "./CustomerSearch";
import CustomerTable from "./CustomerTable";
import CRUDButtons from "./CRUDButtons";
import CustomerDetailsModal from "./modals/CustomerDetailsModal";
import CustomerFormModal from "./modals/CustomerFormModal";
import CustomerEditModal from "./modals/CustomerEditModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import { type Customer } from "../../../types/customer/Customer";
import CustomerStatistic from "./CustomerStatistic";

export default function CustomersDashboard() {
    const [query, setQuery] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleSelectRow = (customer: Customer) => {
        setSelectedCustomer(customer);
        setDetailsOpen(true);
    };

    const handleRefresh = () => setRefreshKey((k) => k + 1);

    return (
        <div className="min-h-screen min-w-screen">

            <h1 className="uppercase font-['BebasNeue'] text-6xl">
                Kunden
            </h1>

            <div className="mt-20 flex w-[90%] items-center justify-between">

                <CustomerSearch
                    onSearch={setQuery}
                    onReset={() => setQuery("")}
                />

                <CRUDButtons
                    selectedCustomer={selectedCustomer}
                    onCreate={() => setCreateOpen(true)}
                    onEdit={() => setEditOpen(true)}
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

            <CustomerStatistic />

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

            {editOpen && selectedCustomer && (
                <CustomerEditModal
                    customer={selectedCustomer}
                    onClose={() => setEditOpen(false)}
                    onSuccess={() => {
                        setSelectedCustomer(null);
                        handleRefresh();
                    }}
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