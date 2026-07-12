import StatCard from "./StatCard";
import BarRow from "./BarRow";
import { useReportData } from "../../../hooks/useReportData";

export default function ReportsDashboard() {
    const {
        stores,
        staff,
        inventory,
        error,
        loading,
        staffPerStore,
        inventoryPerStore,
        avgRentalRate,
        activeStaffCount,
    } = useReportData();

    const staffMax = Math.max(1, ...staffPerStore.map((s) => s.value));
    const invMax = Math.max(1, ...inventoryPerStore.map((s) => s.value));

    return (
        <div className="min-h-screen min-w-screen bg-black text-white px-10 py-10">
            <h1 className="uppercase font-['BebasNeue'] text-6xl mb-10">
                Reports
            </h1>

            {error && (
                <p className="text-red-400 mb-6">Fehler beim Laden: {error}</p>
            )}

            {loading && !error && (
                <p className="text-white/50">Lade Daten...</p>
            )}

            {!loading && stores && staff && inventory && (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                        <StatCard label="Filialen" value={stores.length} />
                        <StatCard label="Mitarbeiter" value={staff.length} />
                        <StatCard label="Aktive Mitarbeiter" value={activeStaffCount} />
                        <StatCard label="Inventar" value={inventory.length} />
                        <StatCard label="Ø Miete" value={`$${avgRentalRate.toFixed(2)}`} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="border border-white/10 rounded-xl p-6">
                            <h2 className="uppercase font-['BebasNeue'] text-2xl mb-4">
                                Filialen
                            </h2>
                            <div className="flex flex-col gap-4">
                                {stores.map((s) => (
                                    <div
                                        key={s.store_id}
                                        className="text-sm border-b border-white/5 pb-2"
                                    >
                                        <div className="font-semibold">
                                            Filiale {s.store_id} — {s.city}, {s.country}
                                        </div>
                                        <div className="text-white/50">
                                            Manager: {s.manager_first_name} {s.manager_last_name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border border-white/10 rounded-xl p-6">
                            <h2 className="uppercase font-['BebasNeue'] text-2xl mb-4">
                                Mitarbeiter pro Filiale
                            </h2>
                            <div className="flex flex-col gap-4">
                                {staffPerStore.map((row) => (
                                    <BarRow
                                        key={row.label}
                                        label={row.label}
                                        value={row.value}
                                        max={staffMax}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="border border-white/10 rounded-xl p-6">
                            <h2 className="uppercase font-['BebasNeue'] text-2xl mb-4">
                                Inventar pro Filiale
                            </h2>
                            <div className="flex flex-col gap-4">
                                {inventoryPerStore.map((row) => (
                                    <BarRow
                                        key={row.label}
                                        label={row.label}
                                        value={row.value}
                                        max={invMax}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}