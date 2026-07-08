export type CreateCustomer = {
    store_id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    full_address: {
        country_id: number
        city_id: number
        postal_code: string
        district: string
        address: string
    }
}