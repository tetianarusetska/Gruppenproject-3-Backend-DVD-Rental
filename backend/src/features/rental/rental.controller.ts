import { type Request, type Response } from "express"
import type { Rental } from "./types/Rental.ts";
import rentalServices from "./rental.services.ts";

const findRental = async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid rental ID provided" });
    }

    const rental = await rentalServices.find(id)

    res.json(rental)
}

const findAllRentals = async (_: Request, res: Response)  => {
    const rentals = await rentalServices.findAll()

    res.json(rentals)
}

const findRentalsActive = async (_: Request, res: Response) => {
    const rentals = await rentalServices.findActive()

    res.json(rentals)
}

const findRentalsAvailability = async (req: Request, res: Response) => {
    const name = String(req.query.name ?? "")

    const rentals = await rentalServices.findAvailability(name)

    res.json(rentals)
}

export default {
    find: findRental,
    findAll: findAllRentals,
    findActive: findRentalsActive,
    findAvailability: findRentalsAvailability
}