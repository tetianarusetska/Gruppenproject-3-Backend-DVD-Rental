import { type Customer } from "../types/Customer";
import type { Payment } from "../types/Payment";
import type { Rental } from "../types/Rental";

const API_URL = "http://localhost:3000";

export const customerService = {


  async getAll(): Promise<Customer[]> {
    const res = await fetch(`${API_URL}/customers/all`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Kunden konnten nicht geladen werden.");
    }
    return res.json();
  },


  async search(query: string): Promise<Customer[]> {
    const res = await fetch(`${API_URL}/customers/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Suche fehlgeschlagen.");
    }
    return res.json();
  },


  async getRentals(customerId: number): Promise<Rental[]> {
    const res = await fetch(`${API_URL}/customers/${customerId}/rentals`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Ausleihen konnten nicht geladen werden.");
    }
    return res.json();
  },


  async getPayments(customerId: number): Promise<Payment[]> {
    const res = await fetch(`${API_URL}/customers/${customerId}/payments`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Zahlungen konnten nicht geladen werden.");
    }
    return res.json();
  },

  async create(payload: {
    store_id: number;
    first_name: string;
    last_name: string;
    email: string;
    full_address: {
      postal_code: string;
      city_id: number;
      district: string;
      address: string;
      phone: string;
    };
  }): Promise<Customer> {
    const res = await fetch(`${API_URL}/customers/new`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Kunde konnte nicht erstellt werden.");
    }
    return res.json();
  },

  
  async delete(customerId: number): Promise<void> {
    const res = await fetch(`${API_URL}/customers/${customerId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Kunde konnte nicht gelöscht werden.");
    }
  },
};