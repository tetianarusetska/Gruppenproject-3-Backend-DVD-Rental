import { mockCustomers } from "./data/mockCustomers";
import { useState } from "react";

export default function CustomerTable() {
    const customersPerPage = 5;

    const totalCustomers = mockCustomers.length;
    const totalPages = Math.ceil(totalCustomers / customersPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const currentCustomers = mockCustomers.slice(
        (currentPage - 1) * customersPerPage,
        currentPage * customersPerPage
    );

    const getVisiblePages = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
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
                            "Land",
                            "Bezirk",
                            "Adress-ID",
                            "Adresse",
                            "Telefon",
                        ].map((title) => (
                            <th
                                key={title}
                                className="px-4 py-4 text-center"
                            >
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {currentCustomers.map((customer) => (
                        <tr
                            key={customer.customer_id}
                            className="border-b border-zinc-800 transition-colors hover:bg-zinc-900"
                        >
                            <td className="px-4 py-3 text-center">{customer.customer_id}</td>
                            <td className="px-4 py-3 text-center">{customer.store_id}</td>
                            <td className="px-4 py-3 text-center">{customer.first_name}</td>
                            <td className="px-4 py-3 text-center">{customer.last_name}</td>
                            <td className="px-4 py-3 text-center">{customer.email}</td>
                            <td className="px-4 py-3 text-center">{customer.country_id}</td>
                            <td className="px-4 py-3 text-center">{customer.country}</td>
                            <td className="px-4 py-3 text-center">{customer.city_id}</td>
                            <td className="px-4 py-3 text-center">{customer.city}</td>
                            <td className="px-4 py-3 text-center">{customer.postal_code}</td>
                            <td className="px-4 py-3 text-center">{customer.country}</td>
                            <td className="px-4 py-3 text-center">{customer.district}</td>
                            <td className="px-4 py-3 text-center">{customer.address_id}</td>
                            <td className="px-4 py-3 text-center">{customer.address}</td>
                            <td className="px-4 py-3 text-center">{customer.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4">

                <p className="text-sm text-zinc-400">
                    Zeige {(currentPage - 1) * customersPerPage + 1}–
                    {Math.min(currentPage * customersPerPage, totalCustomers)}
                    {" "}von {totalCustomers} Kunden
                </p>


                <div className="flex items-center gap-3">

                    {getVisiblePages().map((page, index) =>
                        page === "..." ? (
                            <span
                                key={index}
                                className="text-zinc-600"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`text-sm transition ${currentPage === page
                                        ? "font-semibold text-white"
                                        : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    )}

                </div>

            </div>

        </div>
    );
}