import type { Request, Response } from "express";
import categorySerivces from "./category.serivces.ts";

const findCategory = async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params

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