export type Customer = {
    customer_id: number
    store_id: number
    first_name: string
    last_name: string
    email: string
    full_address: {
        country_id: number
        country: string
        city_id: number
        city: string,
        postal_code: string
        district: string
        address_id: number
        address: string
        phone: string
    }
}