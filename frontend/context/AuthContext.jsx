"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode(JSON.parse(savedToken));
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token in localStorage", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    try {
      // console.log("data login:", token);
      localStorage.setItem("token", JSON.stringify(token));
      const decoded = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify(decoded));
      setUser(decoded);
      router.push("/dashboard");
    } catch (error) {
      console.error("Invalid token during login", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
