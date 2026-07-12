import { useEffect, useMemo, useState } from "react";
import { storeService, staffService, inventoryService } from "../services/report.service";
import type { Store } from "../types/report/store";
import type { Staff } from "../types/report/staff";
import type { InventoryItem } from "../types/report/inventoryItem";

export function useReportData() {
    const [stores, setStores] = useState<Store[] | null>(null);
    const [staff, setStaff] = useState<Staff[] | null>(null);
    const [inventory, setInventory] = useState<InventoryItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            storeService.getAll(),
            staffService.getAll(),
            inventoryService.getAll(),
        ])
            .then(([s, st, inv]) => {
                setStores(s);
                setStaff(st);
                setInventory(inv);
            })
            .catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const staffPerStore = useMemo(() => {
        if (!staff || !stores) return [];
        const counts = new Map<number, number>();
        for (const s of staff) {
            counts.set(s.store_id, (counts.get(s.store_id) ?? 0) + 1);
        }
        return stores
            .map((store) => ({
                label: `Filiale ${store.store_id} · ${store.city}`,
                value: counts.get(store.store_id) ?? 0,
            }))
            .sort((a, b) => b.value - a.value);
    }, [staff, stores]);

    const inventoryPerStore = useMemo(() => {
        if (!inventory || !stores) return [];
        const counts = new Map<number, number>();
        for (const i of inventory) {
            counts.set(i.store_id, (counts.get(i.store_id) ?? 0) + 1);
        }
        return stores
            .map((store) => ({
                label: `Filiale ${store.store_id} · ${store.city}`,
                value: counts.get(store.store_id) ?? 0,
            }))
            .sort((a, b) => b.value - a.value);
    }, [inventory, stores]);

    const avgRentalRate = useMemo(() => {
        if (!inventory || inventory.length === 0) return 0;
        const sum = inventory.reduce((acc, i) => acc + parseFloat(i.rental_rate), 0);
        return sum / inventory.length;
    }, [inventory]);

    const activeStaffCount = useMemo(
        () => staff?.filter((s) => s.active).length ?? 0,
        [staff]
    );

    return {
        stores,
        staff,
        inventory,
        error,
        loading,
        staffPerStore,
        inventoryPerStore,
        avgRentalRate,
        activeStaffCount,
    };
}