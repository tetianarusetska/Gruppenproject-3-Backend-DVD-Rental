export interface Payment {
    payment_id: number;
    payment_date: string;
    amount: string;
    staff_id: number;
    rental_id: number;
    film: {
        film_id: number;
        title: string;
    };
}