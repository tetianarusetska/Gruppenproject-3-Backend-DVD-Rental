import type { InventoryItem } from "../types/report/inventoryItem";
import type { Staff } from "../types/report/staff";
import type { Store } from "../types/report/store";


const API_URL = "/api";

export const storeService = {
    async getAll(): Promise<Store[]> {
        const res = await fetch(`${API_URL}/store/all`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Filialen konnten nicht geladen werden.");
        }

        return res.json();
    },

    async getById(storeId: number): Promise<Store> {
        const res = await fetch(`${API_URL}/store/${storeId}`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Filiale konnte nicht geladen werden.");
        }

        return res.json();
    },

    async create(payload: {
        manager_staff_id: number;
        address_id: number;
    }): Promise<Store> {
        const res = await fetch(`${API_URL}/store/new`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Filiale konnte nicht erstellt werden.");
        }

        return res.json();
    },
};

export const staffService = {
    async getAll(): Promise<Staff[]> {
        const res = await fetch(`${API_URL}/staff/all`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Mitarbeiter konnten nicht geladen werden.");
        }

        return res.json();
    },

    async getById(staffId: number): Promise<Staff> {
        const res = await fetch(`${API_URL}/staff/${staffId}`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Mitarbeiter konnte nicht geladen werden.");
        }

        return res.json();
    },

    async create(payload: {
        first_name: string;
        last_name: string;
        address_id: number;
        email: string;
        store_id: number;
        username: string;
        password: string;
    }): Promise<Staff> {
        const res = await fetch(`${API_URL}/staff/new`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Mitarbeiter konnte nicht erstellt werden.");
        }

        return res.json();
    },
};

export const inventoryService = {
    async getAll(): Promise<InventoryItem[]> {
        const res = await fetch(`${API_URL}/inventory/all`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Inventar konnte nicht geladen werden.");
        }

        return res.json();
    },

    async getById(inventoryId: number): Promise<InventoryItem> {
        const res = await fetch(`${API_URL}/inventory/${inventoryId}`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Inventar-Eintrag konnte nicht geladen werden.");
        }

        return res.json();
    },

    async create(payload: {
        film_id: number;
        store_id: number;
    }): Promise<InventoryItem> {
        const res = await fetch(`${API_URL}/inventory/new`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Inventar-Eintrag konnte nicht erstellt werden.");
        }

        return res.json();
    },
};