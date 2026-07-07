export class CustomerNotFound extends Error {
    constructor(customer_id: number) {
        super(`Kunde mit der ID ${customer_id} wurde nicht gefunden.`)
        this.name = new.target.name
    }
}