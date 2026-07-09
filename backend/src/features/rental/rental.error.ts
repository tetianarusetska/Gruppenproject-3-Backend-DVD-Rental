export class RentalNotFound extends Error {
    constructor(id: number) {
        super(`A rental with id=${id} could not be found.`)
    }
}