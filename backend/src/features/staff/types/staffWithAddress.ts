import { type Staff } from "./staff.ts"

export interface StaffWithAddress extends Staff {
    address: string;
    address2: string | null;
    district: string;
    city: string;
    country: string;
    postal_code: string | null;
    phone: string;
}