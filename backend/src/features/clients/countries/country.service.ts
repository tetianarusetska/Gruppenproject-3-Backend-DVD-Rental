import { type Country } from "../types/country.ts"
import countryRepo from "./country.repo.ts"


async function getAllCountries(): Promise<Country[]> {
    return await countryRepo.getAll();
}

export default {
    getAll: getAllCountries
}