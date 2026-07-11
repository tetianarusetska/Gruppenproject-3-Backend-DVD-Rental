export class CountryNotFound extends Error {
    constructor(country_id: number) {
        super(`Land mit der ID ${country_id} wurde nicht gefunden.`)
        this.name = new.target.name
    }
}