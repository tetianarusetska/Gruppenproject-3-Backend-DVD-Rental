export class InventoryNotFound extends Error {
    constructor(inventory_id: number) {
        super(⁠ Inventory mit der ID ${inventory_id} wurde nicht gefunden. ⁠)
        this.name = new.target.name
    }
}