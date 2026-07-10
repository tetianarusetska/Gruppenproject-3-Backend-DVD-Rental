import { useState } from "react";
import { customerService } from "../../../../services/customer.service";
import { type Customer } from "../../../../types/Customer";

interface DeleteConfirmModalProps {
    customer: Customer;
    onClose: () => void;
    onSuccess: () => void;
}

export default function DeleteConfirmModal({ customer, onClose, onSuccess }: DeleteConfirmModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);
        try {
            await customerService.delete(customer.customer_id);
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-[90%] max-w-md rounded-2xl border border-zinc-800 bg-black p-8 font-['Montserrat']">

                <h2 className="text-xl font-semibold text-white">
                    Kunde löschen?
                </h2>
                <p className="mt-3 text-sm text-zinc-400">
                    Möchten Sie {customer.first_name} {customer.last_name} wirklich unwiderruflich löschen?
                </p>

                {error && (
                    <p className="mt-4 text-sm text-red-500">{error}</p>
                )}

                <div className="mt-8 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="rounded-2xl border border-zinc-800 px-6 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="rounded-2xl bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                        {isDeleting ? "Löschen..." : "Löschen"}
                    </button>
                </div>

            </div>
        </div>
    );
}