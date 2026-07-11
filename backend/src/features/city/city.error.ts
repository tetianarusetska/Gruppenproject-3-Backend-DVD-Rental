export class CityNotFound extends Error {
    constructor(city_id: number) {
        super(`Stadt mit der ID ${city_id} wurde nicht gefunden.`)
    }
}