import { useState } from "react";

interface CustomerSearchProps {
    onSearch: (query: string) => void;
    onReset: () => void;
}

export default function CustomerSearch({
    onSearch,
    onReset,
}: CustomerSearchProps) {

    const [value, setValue] = useState("");

    const handleSearch = () => {
        onSearch(value);
    };

    const handleReset = () => {
        setValue("");
        onReset();
    };

    return (
        <div className="flex items-center gap-4">

            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Kunde nach Vorname, Nachname oder E-Mail suchen..."
                className="w-110 border border-zinc-800 px-5 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-500 font-['Montserrat']"            
            />
            <button
                onClick={handleSearch}
                className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat']"
            >
                Suchen
            </button>

            <button
                onClick={handleReset}
                className="rounded-2xl border border-zinc-800 px-6 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white font-['Montserrat']"
            >
                Zurücksetzen
            </button>

        </div>
    );
}