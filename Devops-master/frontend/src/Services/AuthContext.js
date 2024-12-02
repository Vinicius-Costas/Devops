// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(AuthService.getCurrentUser());

    const login = async (email, password) => {
        try {
            const token = await AuthService.login(email, password);
            setUser(AuthService.getCurrentUser());
            return token;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const token = await AuthService.register(name, email, password);
            setUser(AuthService.getCurrentUser());
            return token;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);