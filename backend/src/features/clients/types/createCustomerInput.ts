export type CreateCustomerInput = {
    store_id: number
    first_name: string
    last_name: string
    email: string
    full_address: {
        country_id: number
        city_id: number
        postal_code: string
        district: string
        address: string
        phone: string
    }
}