import { useState } from "react";
import { customerService } from "../../../../services/customer.service";
import { type Customer } from "../../../../types/Customer";

interface CustomerEditModalProps {
    customer: Customer;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormState {
    store_id: string;
    first_name: string;
    last_name: string;
    email: string;
    postal_code: string;
    city_id: string;
    district: string;
    address: string;
    phone: string;
}

export default function CustomerEditModal({ customer, onClose, onSuccess }: CustomerEditModalProps) {
    const [form, setForm] = useState<FormState>({
        store_id: String(customer.store_id ?? ""),
        first_name: customer.first_name ?? "",
        last_name: customer.last_name ?? "",
        email: customer.email ?? "",
        postal_code: customer.full_address?.postal_code ?? "",
        city_id: String(customer.full_address?.city_id ?? ""),
        district: customer.full_address?.district ?? "",
        address: customer.full_address?.address ?? "",
        phone: customer.full_address?.phone ?? "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        setError(null);

        try {
            await customerService.update({
                customer_id: customer.customer_id,
                store_id: Number(form.store_id),
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                full_address: {
                    address_id: customer.full_address.address_id,
                    postal_code: form.postal_code,
                    city_id: Number(form.city_id),
                    district: form.district,
                    address: form.address,
                    phone: form.phone,
                },
            });
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const fields: { key: keyof FormState; label: string }[] = [
        { key: "first_name", label: "Vorname" },
        { key: "last_name", label: "Nachname" },
        { key: "email", label: "E-Mail" },
        { key: "store_id", label: "Filial-ID" },
        { key: "city_id", label: "Stadt-ID" },
        { key: "postal_code", label: "PLZ" },
        { key: "district", label: "Bezirk" },
        { key: "address", label: "Adresse" },
        { key: "phone", label: "Telefon" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-[90%] max-w-2xl rounded-2xl border border-zinc-800 bg-black p-8 font-['Montserrat']">

                <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-['BebasNeue'] uppercase">
                        Kunde bearbeiten
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-2xl border border-zinc-800 px-4 py-1 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                    >
                        Schließen
                    </button>
                </div>

                {error && (
                    <p className="mt-4 text-sm text-red-500">{error}</p>
                )}

                <div className="mt-6 grid grid-cols-2 gap-4">
                    {fields.map(({ key, label }) => (
                        <div key={key}>
                            <label className="text-xs uppercase tracking-wider text-zinc-500">
                                {label}
                            </label>
                            <input
                                type="text"
                                value={form[key]}
                                onChange={handleChange(key)}
                                className="mt-1 w-full border border-zinc-800 px-4 py-2 text-sm text-white outline-none focus:border-zinc-500"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="rounded-2xl border border-zinc-800 px-6 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
                    >
                        {isSaving ? "Speichern..." : "Speichern"}
                    </button>
                </div>

            </div>
        </div>
    );
}