export interface Language {
    language_id: number;
    name: string;
}

export interface Category {
    category_id: number;
    name: string;
}

export interface Actor {
    actor_id: number;
    first_name: string;
    last_name: string;
}

export interface Film {
    film_id: number;
    title: string;
    description: string;
    release_year: number;
    rental_duration: number;
    rental_rate: string;
    length: number;
    replacement_cost: string;
    rating: string;
    special_features: string[];
    language: Language;
    categories: Category[];
    actors: Actor[];
}