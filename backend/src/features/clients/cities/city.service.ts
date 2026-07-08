import { type City } from "../types/city.ts"
import cityRepo from "./city.repo.ts"


async function getAllCities(): Promise<City[]> {
    return await cityRepo.getAll();
}

export default {
    getAll: getAllCities
}