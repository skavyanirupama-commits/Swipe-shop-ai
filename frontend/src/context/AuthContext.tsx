import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logoutUser } from "../services/authService";


interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          // Verify token validity by calling GET /api/auth/me
          const response = await getCurrentUser();

          if (response && response.user) {
            setUser(response.user);
            setToken(storedToken);
            localStorage.setItem("user", JSON.stringify(response.user));
          }
        } catch (error) {
          // Token is expired or invalid -> automatic logout
          console.warn("Session expired or token invalid. Logging out...");
          logout();
        }
      } else {
        setUser(null);
        setToken(null);
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
