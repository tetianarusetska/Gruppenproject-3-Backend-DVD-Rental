import { type UpdateAddressInput } from "./updateAddressInput.ts"

export type UpdateCustomerInput = {
    customer_id: number;
    store_id: number;
    first_name: string;
    last_name: string;
    email: string;
    full_address: UpdateAddressInput;
}