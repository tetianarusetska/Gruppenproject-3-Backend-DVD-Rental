interface PaginationProps {
    page: number;
    totalPages: number;
    startItem: number;
    endItem: number;
    totalItems: number;
    onChange: (page: number) => void;
}


export default function Pagination({
    page,
    totalPages,
    startItem,
    endItem,
    totalItems,
    onChange
}: PaginationProps) {


    const pages = [];

    if (totalPages <= 5) {

        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

    } else {

        pages.push(1);

        if (page > 3) {
            pages.push("...");
        }


        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);


        for (let i = start; i <= end; i++) {
            pages.push(i);
        }


        if (page < totalPages - 2) {
            pages.push("...");
        }


        pages.push(totalPages);

    }



    return (
        <div className="mt-8 flex items-center justify-between w-[90%] font-['Montserrat']">


            <p className="text-sm text-zinc-500">
                Zeige {startItem}–{endItem} von {totalItems} Filmen
            </p>



            <div className="flex gap-2">


                {pages.map((item, index) => (

                    item === "..." ?

                        <span
                            key={index}
                            className="px-3 py-2 text-zinc-500"
                        >
                            ...
                        </span>

                        :

                        <button
                            key={item}
                            onClick={() => onChange(Number(item))}
                            className={`px-3 py-2 text-sm rounded-lg ${page === item
                                    ? "text-white"
                                    : "text-zinc-400"
                                }`}
                        >
                            {item}
                        </button>

                ))}


            </div>


        </div>
    );
}