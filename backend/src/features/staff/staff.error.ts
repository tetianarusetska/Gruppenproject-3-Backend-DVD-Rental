export class StaffNotFound extends Error {
    constructor(staff_id: number) {
        super(`Staff mit der ID ${staff_id} wurde nicht gefunden.`)
        this.name = new.target.name
    }
}