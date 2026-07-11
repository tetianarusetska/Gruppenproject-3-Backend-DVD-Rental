import { type Address } from "./types/address.ts"
import addressRepo from "./address.repo.ts"
import type { CreateAddressInput } from "./types/createAddressInput.ts";
import type { UpdateAddressInput } from "./types/updateAddressInput.ts";
import { AddressNotFound } from "./address.error.ts";


async function createAddress(address: CreateAddressInput): Promise<Address> {
    return addressRepo.create(address);
}

async function updateAddress(address: UpdateAddressInput): Promise<Address> {
    return addressRepo.update(address);
}

async function getAllAddresses(): Promise<Address[]> {
    return await addressRepo.getAll();
}

const getAddressById = async (address_id: number): Promise<Address | null> => {
    const address = await addressRepo.getById(address_id);

    if (!address) {
        throw new AddressNotFound(address_id);
    }

    return address;
}

export default {
    getAll: getAllAddresses,
    create: createAddress,
    update: updateAddress,
    getById: getAddressById
}