import { type Country } from "./types/country.ts"
import { CountryNotFound } from "./country.error.ts";
import countryRepo from "./country.repo.ts"


async function getAllCountries(): Promise<Country[]> {
    return await countryRepo.getAll();
}

const getCountryById = async (country_id: number): Promise<Country> => {
    const country = await countryRepo.getById(country_id);

    if (!country) {
        throw new CountryNotFound(country_id);
    }

    return country;
}

export default {
    getAll: getAllCountries,
    getById: getCountryById
}