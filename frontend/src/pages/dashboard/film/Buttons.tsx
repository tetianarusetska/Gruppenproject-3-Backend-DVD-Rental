interface ButtonsProps {
  hasSelection: boolean;

  onCreate: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function Buttons({
  hasSelection,
  onCreate,
  onEdit,
  onDelete

}: ButtonsProps) {


  return (

    <div className="flex flex-row gap-10 justify-end items-end">

      <button
        onClick={onCreate}
        className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat']"
      >
        Erstellen
      </button>

      <button
        disabled={!hasSelection}
        onClick={onEdit}
        className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat'] disabled:opacity-40"
      >
        Bearbeiten
      </button>

      <button
        disabled={!hasSelection}
        onClick={onDelete}
        className="rounded-2xl bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 font-['Montserrat'] disabled:opacity-40"
      >
        Löschen
      </button>

    </div>

  )

}