import { type Country } from "../types/country.ts"
import countriesRepo from "./countries.repo.ts"


async function getAllCountries(): Promise<Country[]> {
    return await countriesRepo.getAll();
}

export default {
    getAll: getAllCountries
}