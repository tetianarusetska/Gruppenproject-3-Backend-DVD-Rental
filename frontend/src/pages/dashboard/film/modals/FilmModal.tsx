import type { Film } from "../../../../types/film/film";

interface FilmModalProps {
  film: Film;
  onClose: () => void;
}

export default function FilmModal({ film, onClose }: FilmModalProps) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div onClick={(e) => e.stopPropagation()} className="w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-black p-8 font-['Montserrat']">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-3xl uppercase font-['BebasNeue']">
              {film.title}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {film.release_year} · {film.length} min · {film.language?.name}
            </p>
          </div>

          <button onClick={onClose} className="text-xl text-zinc-500 transition hover:text-white">
            ✕
          </button>

        </div>


        <div className="mt-6">

          <p className="text-sm text-zinc-500">
            Beschreibung
          </p>

          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            {film.description}
          </p>

        </div>


        <div className="mt-8 space-y-3 text-sm">

          <Info title="Sprache" value={film.language?.name ?? "-"} />
          <Info title="Rating" value={film.rating} />
          <Info title="Mietdauer" value={`${film.rental_duration} Tage`} />
          <Info title="Mietrate" value={`$${Number(film.rental_rate).toFixed(2)}`} />
          <Info title="Ersatzkosten" value={`$${Number(film.replacement_cost).toFixed(2)}`} />
          <Info title="Länge" value={`${film.length} min`} />

        </div>


        <div className="mt-8">

          <p className="text-sm text-zinc-500">
            Kategorien
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            {film.categories?.map((category, index) => (
              <span key={`${category.category_id}-${index}`} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                {category.name}
              </span>
            ))}

          </div>

        </div>


        <div className="mt-8">

          <p className="text-sm text-zinc-500">
            Besetzung
          </p>

          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            {film.actors?.map((actor) => `${actor.first_name} ${actor.last_name}`).join(", ")}
          </p>

        </div>


        {film.special_features?.length > 0 && (
          <div className="mt-8">

            <p className="text-sm text-zinc-500">
              Features
            </p>

            <div className="mt-3 flex flex-wrap gap-2">

              {film.special_features.map((feature, index) => (
                <span key={`${feature}-${index}`} className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                  {feature}
                </span>
              ))}

            </div>

          </div>
        )}

      </div>

    </div>
  );
}


function Info({ title, value }: { title: string; value: string }) {

  return (
    <div className="flex justify-between border-b border-zinc-900 py-2">

      <p className="text-zinc-500">
        {title}
      </p>

      <p className="text-right text-zinc-300">
        {value}
      </p>

    </div>
  );
}