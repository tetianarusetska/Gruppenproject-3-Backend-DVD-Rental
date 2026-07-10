import type { FilmList } from "./types/FilmList";

interface FilmTableProps {
  films: FilmList[];
  selectedFilm: FilmList | null;
  onSelect: (film: FilmList) => void;
}

export default function FilmTable({
  films,
  selectedFilm,
  onSelect,
}: FilmTableProps) {

  return (
    <div className="mt-10 w-[90%] overflow-x-auto border border-zinc-800">

      <table className="w-full text-left text-sm font-['Montserrat']">

        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500">

            <th className="px-4 py-3 font-normal">
              ID
            </th>

            <th className="px-4 py-3 font-normal">
              Titel
            </th>

            <th className="px-4 py-3 font-normal">
              Jahr
            </th>

            <th className="px-4 py-3 font-normal">
              Länge
            </th>

            <th className="px-4 py-3 font-normal">
              Rating
            </th>

            <th className="px-4 py-3 font-normal">
              Sprache
            </th>

            <th className="px-4 py-3 font-normal">
              Kategorien
            </th>

            <th className="px-4 py-3 font-normal">
              Schauspieler
            </th>

          </tr>
        </thead>


        <tbody>

          {films.map((film) => (

            <tr
              key={film.film_id}
              onClick={() => onSelect(film)}

              className={`
                                cursor-pointer
                                border-b
                                border-zinc-900
                                transition
                                hover:bg-zinc-900

                                ${selectedFilm?.film_id === film.film_id
                  ? "bg-zinc-900"
                  : ""
                }
                            `}
            >

              <td className="px-4 py-3 text-zinc-400">
                {film.film_id}
              </td>


              <td className="px-4 py-3">
                {film.title}
              </td>


              <td className="px-4 py-3 text-zinc-400">
                {film.release_year}
              </td>


              <td className="px-4 py-3 text-zinc-400">
                {film.length} min
              </td>


              <td className="px-4 py-3">

                <span className="
                                    px-3
                                    py-1
                                    text-xs
                                ">
                  {film.rating}
                </span>

              </td>


              <td className="px-4 py-3 text-zinc-400">
                {film.language_name.trim()}
              </td>


              <td className="px-4 py-3 text-zinc-400">
                {film.categories}
              </td>


              <td className="px-4 py-3 text-zinc-400">
                {film.actors}
              </td>


            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}