export type CustomerPayment = {
    payment_id: number
    payment_date: Date
    amount: number
    staff_id: number
    rental_id: number
    film: {
        film_id: number
        title: string
    }
};