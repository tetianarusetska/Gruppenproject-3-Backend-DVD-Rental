export class LanguageNotFound extends Error {
    constructor(id: number) {
        super(`A Language with id=${id} could not be found.`)
    }
}