// src/context/AuthProvider.tsx
import React, { useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const isValid = await authService.checkSession();
      setIsAuthenticated(isValid);
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setError(null);
    try {
      await authService.login(username, password);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Anmeldedaten ungültig.";
      setError(errorMessage);
      setIsAuthenticated(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Fehler beim Logout", err);
    } finally {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};