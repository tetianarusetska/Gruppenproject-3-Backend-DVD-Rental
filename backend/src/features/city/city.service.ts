import { type City } from "./types/city.ts"
import cityRepo from "./city.repo.ts"
import { CityNotFound } from "./city.error.ts";


async function getAllCities(): Promise<City[]> {
    return await cityRepo.getAll();
}

const getCityById = async (city_id: number): Promise<City> => {
    const city = await cityRepo.getById(city_id);

    if (!city) {
        throw new CityNotFound(city_id);
    }

    return city;
}


export default {
    getAll: getAllCities,
    getById: getCityById
}