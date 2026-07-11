export type CustomerRental = {
    rental_id: number
    rental_date: Date
    return_date: Date | null
    film: {
        film_id: number
        title: string
    }
};