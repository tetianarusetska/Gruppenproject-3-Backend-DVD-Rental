import { InventoryNotFound } from "./inventory.error.ts";
import inventoryRepo from "./inventory.repo.ts"
import type { CreateInventory } from "./types/createInventory.ts";
import type { InventoryWithDetails } from "./types/inventoryWithDetails.ts";

const getAllInventory = async (): Promise<InventoryWithDetails[]> => {
    return await inventoryRepo.getAll();
}

const getInventoryById = async (inventory_id: number): Promise<InventoryWithDetails> => {
    const inventory = await inventoryRepo.getById(inventory_id);

    if (!inventory) {
        throw new InventoryNotFound(inventory_id);
    }

    return inventory;
}

const createInventory = async (data: CreateInventory): Promise<InventoryWithDetails> => {
    const inventoryId = await inventoryRepo.create(data);

    const inventory = await inventoryRepo.getById(inventoryId);

    if (!inventory) {
        throw new InventoryNotFound(inventoryId);
    }

    return inventory;
}

export default {
    getAll: getAllInventory,
    getById: getInventoryById,
    create: createInventory
}