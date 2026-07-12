export class StoreNotFound extends Error {
    constructor(store_id: number) {
        super(⁠ Store mit der ID ${store_id} wurde nicht gefunden. ⁠)
        this.name = new.target.name
    }
}