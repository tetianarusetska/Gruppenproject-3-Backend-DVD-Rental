import { type City } from "../types/city.ts"
import citiesRepo from "./cities.repo.ts"


async function getAllCities(): Promise<City[]> {
    return await citiesRepo.getAll();
}

export default {
    getAll: getAllCities
}