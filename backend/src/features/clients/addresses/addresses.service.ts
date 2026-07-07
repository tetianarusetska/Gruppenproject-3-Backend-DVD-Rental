import { type Address } from "../types/address.ts"
import addressesRepo from "./addresses.repo.ts"


async function getAllAddresses(): Promise<Address[]> {
    return await addressesRepo.getAll();
}

export default {
    getAll: getAllAddresses
}