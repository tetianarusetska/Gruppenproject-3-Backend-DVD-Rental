import type { Response, NextFunction } from "express";
import type { Request } from "../customer/types/request.ts";
import storeService from "./store.service.ts"

const getAllStores = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const store = await storeService.getAll();
        res.status(200).json(store);
    } catch (err) {
        next(err);
    }
};

const getStoreById = async (req: Request<{ store_id: string }>, res: Response, next: NextFunction) => {
    try {
        const storeId = Number(req.params.store_id);

         if (isNaN(storeId)) {
            return res.status(400).json({ error: "Ungültige Store-ID angegeben." });
        }

        const store = await storeService.getById(storeId);
        res.status(200).json(store);
    } catch (err) {
        next(err);
    }
}

const createStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdStore = await storeService.create(req.body);

        return res.status(201).json(createdStore);

    } catch (err) {
        next(err);
    }
};

export default {
    getAll: getAllStores,
    getById: getStoreById,
    create: createStore
}