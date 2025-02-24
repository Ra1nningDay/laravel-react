import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    useEffect(() => {
        const checkToken = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", checkToken);
        return () => window.removeEventListener("storage", checkToken);
    }, []);

    

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
