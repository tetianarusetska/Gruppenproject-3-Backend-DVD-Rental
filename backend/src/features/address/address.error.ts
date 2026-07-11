export class AddressNotFound extends Error {
    constructor(address_id: number) {
        super(`Address mit der ID ${address_id} wurde nicht gefunden.`)
    }
}