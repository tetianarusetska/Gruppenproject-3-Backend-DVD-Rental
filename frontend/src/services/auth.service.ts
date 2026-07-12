const API_URL = "http://localhost:3000";

export const authService = {
  // 1. Login-Daten an das Backend senden
  async login(username: string, password: string): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include", // WICHTIG: Erlaubt das Setzen des Session-Cookies
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Login fehlgeschlagen.");
    }
    return res.json();
  },

  // 2. Prüfen, ob die aktuelle Session (über das Cookie) noch gültig ist
  // Tipp: Erstelle dafür im Backend z.B. eine Route GET /auth/me oder nutze eine geschützte Testroute
  async checkSession(): Promise<boolean> {
    try {
      const res = await fetch(`${API_URL}/auth/me`, { // oder eine geschützte Route wie /rentals
        method: "GET",
        credentials: "include", // Sendet das Session-Cookie mit
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // 3. Ausloggen
  async logout(): Promise<void> {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  }
};