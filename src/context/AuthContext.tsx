import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define a interface do contexto
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cria o provedor do contexto
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>

            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext deve ser usado dentro de um ThemeProvider");
    }
    return context;
  };

export {useAuthContext, AuthProvider };
