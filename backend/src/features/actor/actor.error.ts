export class ActorNotFound extends Error {
    constructor(id: number) {
        super(`A film with id=${id} could not be found.`)
    }
}