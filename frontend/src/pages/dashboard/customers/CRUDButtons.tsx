

export default function CRUDButtons() {
    return <div className="flex flex-row gap-10 justify-end items-end">
        <button className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat']">Erstellen</button>
        <button className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat']">Aktualisieren</button>
        <button className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat']">Löschen</button>
    </div>
}