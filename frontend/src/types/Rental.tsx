export interface Rental {
    rental_id: number;
    rental_date: string;
    return_date: string | null;
    film: {
        film_id: number;
        title: string;
    };
}
