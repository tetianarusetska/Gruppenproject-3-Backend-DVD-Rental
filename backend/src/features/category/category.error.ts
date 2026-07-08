export class CategoryNotFound extends Error {
    constructor(id: number) {
        super(`A category with id=${id} could not be found.`)
    }
}