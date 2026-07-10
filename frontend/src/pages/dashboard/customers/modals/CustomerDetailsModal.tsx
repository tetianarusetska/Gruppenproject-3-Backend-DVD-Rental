import { useState, useEffect } from "react";
import { customerService } from "../../../../services/customer.service";
import { type Customer } from "../../../../types/Customer";
import type { Payment } from "../../../../types/Payment";
import type { Rental } from "../../../../types/Rental";

interface CustomerDetailsModalProps {
    customer: Customer | null;
    onClose: () => void;
}

type Tab = "info" | "rentals" | "payments";

export default function CustomerDetailsModal({ customer, onClose }: CustomerDetailsModalProps) {
    const [tab, setTab] = useState<Tab>("info");
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!customer) return;
        setTab("info");
        setRentals([]);
        setPayments([]);
    }, [customer]);

    useEffect(() => {
        if (!customer) return;
        if (tab === "rentals" && rentals.length === 0) {
            loadRentals();
        }
        if (tab === "payments" && payments.length === 0) {
            loadPayments();
        }
    }, [tab, customer]);

    const loadRentals = () => {
        if (!customer) return;
        setIsLoading(true);
        setError(null);
        customerService
            .getRentals(customer.customer_id)
            .then(setRentals)
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    };

    const loadPayments = () => {
        if (!customer) return;
        setIsLoading(true);
        setError(null);
        customerService
            .getPayments(customer.customer_id)
            .then(setPayments)
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    };

    if (!customer) return null;

    const tabs: { key: Tab; label: string }[] = [
        { key: "info", label: "Info" },
        { key: "rentals", label: "Ausleihen" },
        { key: "payments", label: "Zahlungen" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-[90%] max-w-3xl rounded-2xl border border-zinc-800 bg-black p-8 font-['Montserrat']">

                <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-['BebasNeue'] uppercase">
                        {customer.first_name} {customer.last_name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-2xl border border-zinc-800 px-4 py-1 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                    >
                        Schließen
                    </button>
                </div>

                <div className="mt-6 flex gap-2 border-b border-zinc-800">
                    {tabs.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={`px-4 py-2 text-sm font-semibold transition ${tab === key
                                ? "border-b-2 border-white text-white"
                                : "text-zinc-500 hover:text-zinc-300"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="mt-6 max-h-[50vh] overflow-y-auto hide-scrollbar">

                    {tab === "info" && (
                        <div className="grid grid-cols-2 gap-4 text-sm text-zinc-200">
                            <Info label="Kunden-ID" value={customer.customer_id} />
                            <Info label="Filial-ID" value={customer.store_id} />
                            <Info label="Vorname" value={customer.first_name} />
                            <Info label="Nachname" value={customer.last_name} />
                            <Info label="E-Mail" value={customer.email} />
                            <Info label="Land-ID" value={customer.full_address?.country_id} />
                            <Info label="Land" value={customer.full_address?.country} />
                            <Info label="Stadt-ID" value={customer.full_address?.city_id} />
                            <Info label="Stadt" value={customer.full_address?.city} />
                            <Info label="PLZ" value={customer.full_address?.postal_code} />
                            <Info label="Bezirk" value={customer.full_address?.district} />
                            <Info label="Adress-ID" value={customer.full_address?.address_id} />
                            <Info label="Adresse" value={customer.full_address?.address} />
                            <Info label="Telefon" value={customer.full_address?.phone} />
                        </div>
                    )}

                    {tab === "rentals" && (
                        <ListTable
                            isLoading={isLoading}
                            error={error}
                            rows={rentals}
                            empty="Keine Ausleihen gefunden."
                            headers={["Ausleih-ID", "Film-ID", "Film", "Ausgeliehen am", "Zurückgegeben am"]}
                            renderRow={(r: Rental) => (
                                <>
                                    <td className="px-4 py-3 text-center">{r.rental_id}</td>
                                    <td className="px-4 py-3 text-center">{r.film.film_id}</td>
                                    <td className="px-4 py-3">{r.film.title}</td>
                                    <td className="px-4 py-3 text-center">{r.rental_date}</td>
                                    <td className="px-4 py-3 text-center">{r.return_date ?? "—"}</td>
                                </>
                            )}
                        />
                    )}

                    {tab === "payments" && (
                        <ListTable
                            isLoading={isLoading}
                            error={error}
                            rows={payments}
                            empty="Keine Zahlungen gefunden."
                            headers={["Zahlungs-ID", "Ausleih-ID", "Film-ID", "Film", "Betrag", "Datum", "Mitarbeiter-ID"]}
                            renderRow={(p: Payment) => (
                                <>
                                    <td className="px-4 py-3 text-center">{p.payment_id}</td>
                                    <td className="px-4 py-3 text-center">{p.rental_id}</td>
                                    <td className="px-4 py-3 text-center">{p.film.film_id}</td>
                                    <td className="px-4 py-3">{p.film.title}</td>
                                    <td className="px-4 py-3 text-center">{Number(p.amount).toFixed(2)} €</td>
                                    <td className="px-4 py-3 text-center">{p.payment_date}</td>
                                    <td className="px-4 py-3 text-center">{p.staff_id}</td>
                                </>
                            )}
                        />
                    )}

                </div>

            </div>
        </div>
    );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
            <p className="mt-1">{value ?? "—"}</p>
        </div>
    );
}

function ListTable<T>({
    isLoading,
    error,
    rows,
    empty,
    headers,
    renderRow,
}: {
    isLoading: boolean;
    error: string | null;
    rows: T[];
    empty: string;
    headers: string[];
    renderRow: (row: T) => React.ReactNode;
}) {
    if (isLoading) {
        return <p className="py-10 text-center text-zinc-400">Lade...</p>;
    }
    if (error) {
        return <p className="py-10 text-center text-red-500">{error}</p>;
    }
    if (rows.length === 0) {
        return <p className="py-10 text-center text-zinc-500">{empty}</p>;
    }
    return (
        <table className="w-full text-sm text-zinc-200">
            <thead className="text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                    {headers.map((h) => (
                        <th key={h} className="px-4 py-2 text-center">{h}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="border-t border-zinc-800">
                        {renderRow(row)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}