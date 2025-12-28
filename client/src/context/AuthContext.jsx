import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await mockLogin(credentials);

    if (!response.success) {
      throw new Error(response.message || "Login failed");
    }

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setToken(response.token);
    setUser(response.user);

    return response.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

/* TEMP MOCK — replace with real API later */
const mockLogin = async ({ email, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "admin@pragency.com" && password === "admin123") {
        resolve({
          success: true,
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: 1,
            name: "Admin User",
            email,
            role: "admin",
          },
        });
      } else {
        resolve({
          success: false,
          message: "Invalid email or password",
        });
      }
    }, 800);
  });
};
