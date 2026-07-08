export class CustomerNotFound extends Error {
    constructor(customer_id: number) {
        super(`Kunde mit der ID ${customer_id} wurde nicht gefunden.`)
        this.name = new.target.name
    }
}

export class CustomerHasRelatedRecords extends Error {
    constructor(customer_id: number) {
        super(`Kunde mit der ID ${customer_id} hat verknüpfte Datensätze und kann nicht gelöscht werden.`)
        this.name = new.target.name
    }
}