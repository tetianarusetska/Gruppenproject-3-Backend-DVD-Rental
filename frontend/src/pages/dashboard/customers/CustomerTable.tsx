import { useState, useEffect } from "react";
import { customerService } from "../../../services/customer.service";
import { type Customer } from "../../../types/Customer";

interface CustomerTableProps {
    query: string;
}

export default function CustomerTable({ query }: CustomerTableProps) {
    const customersPerPage = 5;

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadCustomers = () => {
        setIsLoading(true);
        setError(null);

        const request = query
            ? customerService.search(query)
            : customerService.getAll();

        request
            .then((data) => {
                setCustomers(data);
                setCurrentPage(1);
            })
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        loadCustomers();
    }, [query]);

    const totalCustomers = customers.length;
    const totalPages = Math.ceil(totalCustomers / customersPerPage);

    const currentCustomers = customers.slice(
        (currentPage - 1) * customersPerPage,
        currentPage * customersPerPage
    );

    const getVisiblePages = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        pages.push(1);

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        if (start > 2) pages.push("...");

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) pages.push("...");

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="flex flex-col gap-4">

            {isLoading ? (
                <div className="rounded-2xl border border-zinc-800 bg-black p-10 text-center text-zinc-400">
                    Lade Kunden...
                </div>
            ) : error ? (
                <div className="rounded-2xl border border-zinc-800 bg-black p-10 text-center text-red-500">
                    {error}
                </div>
            ) : (
                <div className="overflow-x-auto hide-scrollbar rounded-2xl border border-zinc-800 bg-black">

                    <table className="min-w-max w-full text-sm text-zinc-200">

                        <thead className="border-b border-zinc-800 bg-zinc-950 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            <tr>
                                {[
                                    "Kunden-ID",
                                    "Filial-ID",
                                    "Vorname",
                                    "Nachname",
                                    "E-Mail",
                                    "Land-ID",
                                    "Land",
                                    "Stadt-ID",
                                    "Stadt",
                                    "PLZ",
                                    "Bezirk",
                                    "Adress-ID",
                                    "Adresse",
                                    "Telefon",
                                ].map((title) => (
                                    <th key={title} className="px-4 py-4 text-center">
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {currentCustomers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={14}
                                        className="px-4 py-10 text-center text-zinc-500"
                                    >
                                        Keine Kunden gefunden.
                                    </td>
                                </tr>
                            ) : (
                                currentCustomers.map((customer) => (
                                    <tr
                                        key={customer.customer_id}
                                        className="border-b border-zinc-800 hover:bg-zinc-900 font-['Montserrat']"
                                    >
                                        <td className="px-4 py-3 text-center">{customer.customer_id}</td>
                                        <td className="px-4 py-3 text-center">{customer.store_id}</td>
                                        <td className="px-4 py-3 text-center">{customer.first_name}</td>
                                        <td className="px-4 py-3 text-center">{customer.last_name}</td>
                                        <td className="px-4 py-3 text-center">{customer.email}</td>

                                        <td className="px-4 py-3 text-center">
                                            {customer.full_address?.country_id}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {customer.full_address?.country}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {customer.full_address?.city_id}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {customer.full_address?.city}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {customer.full_address?.postal_code}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {customer.full_address?.district}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {customer.full_address?.address_id}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {customer.full_address?.address}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {customer.full_address?.phone}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

<div className="flex items-center justify-between pr-16 border-t border-zinc-800 px-6 py-4">
                        <p className="text-sm text-zinc-400 font-['Montserrat']">
                            Zeige{" "}
                            {totalCustomers === 0
                                ? 0
                                : (currentPage - 1) * customersPerPage + 1}
                            –
                            {Math.min(
                                currentPage * customersPerPage,
                                totalCustomers
                            )}
                            {" "}von {totalCustomers} Kunden
                        </p>

                        <div className="flex gap-3">

                            {getVisiblePages().map((page, index) =>
                                page === "..." ? (
                                    <span key={index} className="text-zinc-600">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={
                                            currentPage === page
                                                ? "text-white font-semibold"
                                                : "text-zinc-500 hover:text-zinc-300"
                                        }
                                    >
                                        {page}
                                    </button>
                                )
                            )}

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}