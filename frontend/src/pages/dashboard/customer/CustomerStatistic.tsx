import { useState, useEffect } from "react";
import { customerService } from "../../../services/customer.service";

interface MonthlyData {
    month: string;
    count: number;
}

interface CountryData {
    country: string;
    count: number;
}

interface TopCustomer {
    customer_id: number;
    first_name: string;
    last_name: string;
    rental_count: number;
}

const DONUT_COLORS = [
    "#ffffff", "#a1a1aa", "#71717a", "#52525b",
    "#3f3f46", "#27272a", "#d4d4d8", "#e4e4e7",
];

export default function CustomerStatistic() {
    const [monthly, setMonthly] = useState<MonthlyData[]>([]);
    const [countries, setCountries] = useState<CountryData[]>([]);
    const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        Promise.all([
            customerService.getNewCustomersByMonth(),
            customerService.getCustomersByCountry(),
            customerService.getTopCustomersByRentals(8),
        ])
            .then(([monthlyData, countryData, topData]) => {
                setMonthly(monthlyData);
                setCountries(countryData);
                setTopCustomers(topData);
            })
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <div className="mt-10 rounded-2xl border border-zinc-800 bg-black p-10 text-center text-zinc-400 font-['Montserrat']">
                Lade Statistiken...
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-10 rounded-2xl border border-zinc-800 bg-black p-10 text-center text-red-500 font-['Montserrat']">
                {error}
            </div>
        );
    }

    return (
        <div className="mt-30 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <MonthlyBarChart data={monthly} />
            <CountryDonutChart data={countries} />
            <TopCustomersChart data={topCustomers} />
        </div>
    );
}



function MonthlyBarChart({ data }: { data: MonthlyData[] }) {
    const max = Math.max(...data.map((d) => d.count), 1);
    const recent = data.slice(-12); // letzte 12 Monate

    return (
        <div className="rounded-2xl border border-zinc-800 bg-black p-6 font-['Montserrat']">
            <h3 className="font-['BebasNeue'] text-xl uppercase tracking-wide text-white">
                Neue Kunden pro Monat
            </h3>
            <p className="mt-1 text-xs text-zinc-500">Letzte 12 Monate</p>

            <div className="mt-6 flex h-48 items-end gap-2">
                {recent.map((d) => {
                    const heightPct = (d.count / max) * 100;
                    return (
                        <div
                            key={d.month}
                            className="group relative flex flex-1 flex-col items-center justify-end"
                        >
                            <div className="pointer-events-none absolute -top-7 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-black opacity-0 transition group-hover:opacity-100">
                                {d.count}
                            </div>
                            <div
                                className="w-full rounded-t-md bg-white transition-all duration-300 group-hover:bg-zinc-300"
                                style={{ height: `${heightPct}%`, minHeight: "2px" }}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="mt-2 flex gap-2">
                {recent.map((d) => (
                    <div key={d.month} className="flex-1 text-center text-[10px] text-zinc-500">
                        {formatMonth(d.month)}
                    </div>
                ))}
            </div>
        </div>
    );
}

function formatMonth(monthStr: string): string {
    const [year, month] = monthStr.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("de-DE", { month: "short" });
}


function CountryDonutChart({ data }: { data: CountryData[] }) {
    const top = data.slice(0, 6);
    const othersCount = data.slice(6).reduce((sum, d) => sum + d.count, 0);
    const chartData = othersCount > 0
        ? [...top, { country: "Andere", count: othersCount }]
        : top;

    const total = chartData.reduce((sum, d) => sum + d.count, 0);

    let cumulativePct = 0;
    const segments = chartData.map((d, i) => {
        const pct = (d.count / total) * 100;
        const start = cumulativePct;
        cumulativePct += pct;
        return {
            ...d,
            color: DONUT_COLORS[i % DONUT_COLORS.length],
            start,
            end: cumulativePct,
        };
    });

    const gradientString = segments
        .map((s) => `${s.color} ${s.start}% ${s.end}%`)
        .join(", ");

    return (
        <div className="rounded-2xl border border-zinc-800 bg-black p-6 font-['Montserrat']">
            <h3 className="font-['BebasNeue'] text-xl uppercase tracking-wide text-white">
                Kunden nach Land
            </h3>
            <p className="mt-1 text-xs text-zinc-500">Top 6 Länder</p>

            <div className="mt-6 flex items-center justify-center">
                <div
                    className="relative h-40 w-40 rounded-full"
                    style={{ background: `conic-gradient(${gradientString})` }}
                >
                    <div className="absolute inset-4 flex items-center justify-center rounded-full bg-black">
                        <span className="font-['BebasNeue'] text-2xl text-white">
                            {total}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
                {segments.map((s) => (
                    <div key={s.country} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: s.color }}
                            />
                            <span className="text-zinc-300">{s.country}</span>
                        </div>
                        <span className="text-zinc-500">{s.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TopCustomersChart({ data }: { data: TopCustomer[] }) {
    const max = Math.max(...data.map((d) => d.rental_count), 1);

    return (
        <div className="rounded-2xl border border-zinc-800 bg-black p-6 font-['Montserrat']">
            <h3 className="font-['BebasNeue'] text-xl uppercase tracking-wide text-white">
                Top Kunden
            </h3>
            <p className="mt-1 text-xs text-zinc-500">Nach Anzahl Ausleihen</p>

            <div className="mt-6 flex flex-col gap-4">
                {data.map((c, i) => {
                    const widthPct = (c.rental_count / max) * 100;
                    return (
                        <div key={c.customer_id}>
                            <div className="mb-1 flex items-center justify-between text-xs">
                                <span className="text-zinc-300">
                                    {i + 1}. {c.first_name} {c.last_name}
                                </span>
                                <span className="font-semibold text-white">
                                    {c.rental_count}
                                </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-900">
                                <div
                                    className="h-full rounded-full bg-white transition-all duration-500"
                                    style={{ width: `${widthPct}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}