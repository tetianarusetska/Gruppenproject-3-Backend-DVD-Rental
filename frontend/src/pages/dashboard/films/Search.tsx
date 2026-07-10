interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

export default function Search({ value, onChange, onSearch }: SearchProps) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filme nach Titel, Release Jahr suchen..."
        className="w-110 border border-zinc-800 px-5 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-500 font-['Montserrat']"
      />
      <button
        onClick={onSearch}
        className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat']"
      >
        Suchen
      </button>

      <button
        onClick={() => onChange("")}
        className="rounded-2xl border border-zinc-800 px-6 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white font-['Montserrat']"
      >
        Zurücksetzen
      </button>
    </div>
  );
}