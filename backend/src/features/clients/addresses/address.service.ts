import { type Address } from "../types/address.ts"
import addressRepo from "./address.repo.ts"


async function getAllAddresses(): Promise<Address[]> {
    return await addressRepo.getAll();
}

export default {
    getAll: getAllAddresses
}