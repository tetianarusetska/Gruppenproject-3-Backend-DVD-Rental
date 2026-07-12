import { StoreNotFound } from "./store.error.ts";
import storeRepo from "./store.repo.ts"
import type { CreateStore } from "./types/createStore.ts";
import type { StoreWithDetails } from "./types/storeWithDetails.ts";

const getAllStores = async (): Promise<StoreWithDetails[]> => {
    return await storeRepo.getAll();
}

const getStoreById = async (store_id: number): Promise<StoreWithDetails> => {
    const store = await storeRepo.getById(store_id);

    if (!store) {
        throw new StoreNotFound(store_id);
    }

    return store;
}

const createStore = async (data: CreateStore): Promise<StoreWithDetails> => {
    const storeId = await storeRepo.create(data);

    const store = await storeRepo.getById(storeId);

    if (!store) {
        throw new StoreNotFound(storeId);
    }

    return store;
}

export default {
    getAll: getAllStores,
    getById: getStoreById,
    create: createStore
}