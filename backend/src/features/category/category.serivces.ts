import { CategoryNotFound } from "./category.error.ts";
import categoryRepo from "./category.repo.ts";
import type { Category } from "./types/category.ts";

const findCategory = async (id: number): Promise<Category> => {
    const category = await categoryRepo.find(id)

    if (!category) {
        throw new CategoryNotFound(id)
    }

    return category
}

const findAllCategories = async (): Promise<Category[]> => {
    return await categoryRepo.findAll();
}

export default {
    find: findCategory,
    findAll: findAllCategories
}