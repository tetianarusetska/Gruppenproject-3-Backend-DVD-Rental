import { useState } from "react";
import type { Film } from "../types/Film";

type ModalMode = "create" | "edit" | "delete";

const RATINGS = ["G", "PG", "PG-13", "R", "NC-17"];

interface FilmModalProps {
    mode: ModalMode;
    film?: Film | null;
    error?: string | null;

    onClose: () => void;
    onSubmit: (data?: Film) => void;
}



export default function Modal({
    mode,
    film,
    error,
    onClose,
    onSubmit
}: FilmModalProps) {

    const [form, setForm] = useState<Partial<Film>>(
        film ?? {
            title: "",
            description: "",
            release_year: 2026,
            rental_duration: 3,
            rental_rate: "0.99",
            length: 90,
            replacement_cost: "20.99",
            rating: "G",
            special_features: [],
        }
    );

    const change = (
        key: keyof Film,
        value: any
    ) => {

        setForm(prev => ({
            ...prev,
            [key]: value
        }));

    };

    if (mode === "delete") {

        return (
            <div
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-[400px] rounded-2xl border border-zinc-800 bg-black p-8 font-['Montserrat']"
                >

                    <h2 className="text-2xl font-['BebasNeue'] uppercase">
                        Film löschen
                    </h2>

                    <p className="mt-4 text-sm text-zinc-400">
                        Möchtest du
                        <span className="text-white">
                            {" "}{film?.title}{" "}
                        </span>
                        wirklich löschen?
                    </p>

                    {error && (
                        <p className="mt-4 rounded-xl border border-red-900 bg-red-950/40 p-3 text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="rounded-xl border border-zinc-700 px-5 py-2 text-sm"
                        >
                            Abbrechen
                        </button>
                        <button
                            onClick={() => onSubmit()}
                            className="rounded-xl bg-white px-5 py-2 text-sm text-black"
                        >
                            Löschen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-black p-8 font-['Montserrat']"
            >
                <div className="flex justify-between">
                    <h2 className="text-3xl uppercase font-['BebasNeue']">

                        {mode === "create"
                            ? "Film erstellen"
                            : "Film bearbeiten"
                        }

                    </h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <p className="mt-4 rounded-xl border border-red-900 bg-red-950/40 p-3 text-sm text-red-400">
                        {error}
                    </p>
                )}

                <div className="mt-6 space-y-4">
                    <input
                        value={form.title ?? ""}
                        onChange={(e) => change("title", e.target.value)}
                        placeholder="Titel"
                        className="w-full border border-zinc-800 bg-black px-4 py-2"
                    />

                    <textarea
                        value={form.description ?? ""}
                        onChange={(e) => change("description", e.target.value)}
                        placeholder="Beschreibung"
                        className="w-full border border-zinc-800 bg-black px-4 py-2"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            value={form.release_year ?? ""}
                            onChange={(e) => change("release_year", Number(e.target.value))}
                            placeholder="Release Jahr"
                            className="w-full border border-zinc-800 bg-black px-4 py-2"
                        />

                        <input
                            type="number"
                            value={form.length ?? ""}
                            onChange={(e) => change("length", Number(e.target.value))}
                            placeholder="Länge (min)"
                            className="w-full border border-zinc-800 bg-black px-4 py-2"
                        />

                        <input
                            type="number"
                            value={form.rental_duration ?? ""}
                            onChange={(e) => change("rental_duration", Number(e.target.value))}
                            placeholder="Mietdauer (Tage)"
                            className="w-full border border-zinc-800 bg-black px-4 py-2"
                        />

                        <input
                            type="number"
                            step="0.01"
                            value={form.rental_rate ?? ""}
                            onChange={(e) => change("rental_rate", e.target.value)}
                            placeholder="Mietrate ($)"
                            className="w-full border border-zinc-800 bg-black px-4 py-2"
                        />

                        <input
                            type="number"
                            step="0.01"
                            value={form.replacement_cost ?? ""}
                            onChange={(e) => change("replacement_cost", e.target.value)}
                            placeholder="Ersatzkosten ($)"
                            className="w-full border border-zinc-800 bg-black px-4 py-2"
                        />

                        <select
                            value={form.rating ?? "G"}
                            onChange={(e) => change("rating", e.target.value)}
                            className="w-full border border-zinc-800 bg-black px-4 py-2"
                        >
                            {RATINGS.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        value={(form.special_features ?? []).join(", ")}
                        onChange={(e) =>
                            change(
                                "special_features",
                                e.target.value
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter((s) => s.length > 0)
                            )
                        }
                        placeholder="Features (Komma-getrennt, z.B. Trailers, Commentaries)"
                        className="w-full border border-zinc-800 bg-black px-4 py-2"
                    />
                </div>

                <button
                    onClick={() => onSubmit(form as Film)}
                    className="mt-8 rounded-xl bg-white px-6 py-2 text-black"
                >
                    Speichern
                </button>
            </div>
        </div>
    );
}
