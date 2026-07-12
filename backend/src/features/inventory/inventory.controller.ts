import type { Response, NextFunction } from "express";
import type { Request } from "../customer/types/request.ts";
import inventoryService from "./inventory.service.ts"

const getAllInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inventory = await inventoryService.getAll();
        res.status(200).json(inventory);
    } catch (err) {
        next(err);
    }
};

const getInventoryById = async (req: Request<{ inventory_id: string }>, res: Response, next: NextFunction) => {
    try {
        const inventoryId = Number(req.params.inventory_id);

        if (!Number.isInteger(inventoryId)) {
            return res.status(400).json({ message: "Invalid inventory_id" });
        }

        const inventory = await inventoryService.getById(inventoryId);
        res.status(200).json(inventory);
    } catch (err) {
        next(err);
    }
}

const createInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdInventory = await inventoryService.create(req.body);

        return res.status(201).json(createdInventory);

    } catch (err) {
        next(err);
    }
};

export default {
    getAll: getAllInventory,
    getById: getInventoryById,
    create: createInventory
}