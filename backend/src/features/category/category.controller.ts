import type { Request, Response } from "express";
import categorySerivces from "./category.serivces.ts";

const findCategory = async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid category ID provided" });
    }

    const category = await categorySerivces.find(id)

    res.json(category)
}

const findAllCategories = async (_: Request, res: Response) => {
    const categories = await categorySerivces.findAll()

    res.json(categories)
}

export default {
    find: findCategory,
    findAll: findAllCategories
}