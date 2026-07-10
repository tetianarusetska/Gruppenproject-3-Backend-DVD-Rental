import { type Customer } from "../../../types/Customer";

interface CRUDButtonsProps {
    selectedCustomer: Customer | null;
    onCreate: () => void;
    onDelete: () => void;
}

export default function CRUDButtons({ selectedCustomer, onCreate, onDelete }: CRUDButtonsProps) {
    return (
        <div className="flex flex-row gap-10 justify-end items-end">
            <button
                onClick={onCreate}
                className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat']"
            >
                Erstellen
            </button>
            <button
                onClick={onDelete}
                disabled={!selectedCustomer}
                className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat'] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
                Löschen
            </button>
        </div>
    );
}