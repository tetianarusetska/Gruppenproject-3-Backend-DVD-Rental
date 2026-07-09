import type { Actor } from "../../actor/types/actor.ts"
import type { Category } from "../../category/types/category.ts"
import type { Language } from "../../language/types/language.ts"

export type Film = {
    id: number
    title: string
    description: string
    release_year: number
    language_id: number
    rental_duration: number
    rental_rate: number
    length: number
    replacement_cost: number
    rating: string
    special_features: string
    fulltext: string
    language: Language
    categories: Category[]
    actors: Actor[]
}

export type FilmList = {
    id: number
    title: string
    description: string
    release_year: number
    length: number
    rating: string
    language_name: string
    categories: string
    actors: string
}

export type FilmAvailability = {
  film_id: number
  title: string
  store_id: number
  total_copies: number
  available_copies: number
}
