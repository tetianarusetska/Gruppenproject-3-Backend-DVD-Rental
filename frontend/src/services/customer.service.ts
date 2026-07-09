import { type Customer } from "../types/Customer";

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
};