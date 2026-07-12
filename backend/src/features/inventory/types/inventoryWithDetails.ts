import { type Inventory } from "./inventory.ts"

export interface InventoryWithDetails extends Inventory {
    title: string;
    rental_rate: number;
    store_address: string;
    store_city: string;
    store_country: string;
}