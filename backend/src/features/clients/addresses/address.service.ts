import { type Address } from "../types/address.ts"
import addressRepo from "./address.repo.ts"
import type { CreateAddressInput } from "../types/createAddressInput.ts";


async function createAddress(address: CreateAddressInput): Promise<Address> {
    return addressRepo.create(address);
}

async function getAllAddresses(): Promise<Address[]> {
    return await addressRepo.getAll();
}

export default {
    getAll: getAllAddresses,
    create: createAddress
}