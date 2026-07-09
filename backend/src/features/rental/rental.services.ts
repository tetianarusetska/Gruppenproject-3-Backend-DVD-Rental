import { RentalNotFound } from "./rental.error.ts";
import rentalRepo from "./rental.repo.ts";
import type { Rental } from "./types/Rental.ts";

const findRental = async (id: number): Promise<Rental> => {
    const rental = await rentalRepo.find(id)

    if (!rental) {
        throw new RentalNotFound(id)
    }

    return rental
}

const findAllRentals = async (): Promise<Rental[]> => {
    return await rentalRepo.findAll()
}

const findRentalsActive = async (): Promise<Rental[]> => {
    return await rentalRepo.findActive()
}

const findRentalsAvailability = async (name:string): Promise<Rental[]> => {
    return await rentalRepo.findAvailability(name)
}

export default {
    find: findRental,
    findAll: findAllRentals,
    findActive: findRentalsActive,
    findAvailability: findRentalsAvailability
}