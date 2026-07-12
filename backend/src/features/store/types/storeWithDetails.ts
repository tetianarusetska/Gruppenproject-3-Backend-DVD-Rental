import { type Store } from "./store.ts"

export interface StoreWithDetails extends Store {
    manager_first_name: string;
    manager_last_name: string;
    address: string;
    district: string;
    city: string;
    country: string;
}