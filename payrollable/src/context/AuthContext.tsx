import React, { createContext, useState, useContext } from "react";
import { login as apiLogin } from "../api/auth"

type User = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const result = await apiLogin(username, password);
    console.log(result);
    if (result.success) {
      console.log("setting user...")
      setUser({ username, password }); 
    } else {
      throw new Error("invalid credentials given.")
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
