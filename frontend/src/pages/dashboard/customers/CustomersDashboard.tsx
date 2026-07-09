import { useState } from "react";
import CustomerSearch from "./CustomerSearch";
import CustomerTable from "./CustomerTable";
import CRUDButtons from "./CRUDButtons";

export default function CustomersDashboard() {
    const [query, setQuery] = useState("");

    return (
        <div className="h-screen w-screen">

            <h1 className="uppercase font-['BebasNeue'] text-6xl">
                Kunden
            </h1>

            <div className="mt-6 flex w-[90%] items-center justify-between">

                <CustomerSearch
                    onSearch={setQuery}
                    onReset={() => setQuery("")}
                />
                <CRUDButtons />

            </div>

            <div className="mt-6">
                <CustomerTable query={query} />
            </div>

        </div>
    );
}