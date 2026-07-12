export interface FilmStatistics {
    totalFilms: number;
    totalCopies: number;
    availableCopies: number;
    avgLength: number;
    avgRentalRate: string;
    topRating: string;

    topFilms: {
        title: string;
        rentals: number;
    }[];

    ratings: {
        rating: string;
        count: number;
    }[];

    rentalsByMonth: {
        month: string;
        count: number;
    }[];
}