import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Credentials {
    email: string;   
    accessToken: string; 
    refreshToken: string; 
}

interface AuthContextType {
    auth: Credentials | null;
    login: (credentials: Credentials) => void;
    logout: () => void;
    refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<Credentials | null>(() => {
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : null;
    });

    useEffect(() => {
        if (auth) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth]);

    const login = (credentials: Credentials) => setAuth(credentials);
    const logout = () => setAuth(null);

    const refreshAccessToken = async () => {
        if (!auth?.refreshToken) return;

        try {
            const response = await axios.post('/api/auth/refresh', {
                refreshToken: auth.refreshToken
            });
            const newAccessToken = response.data.accessToken;
            setAuth(prev => prev ? { ...prev, accessToken: newAccessToken } : null);
        } catch (error) {
            console.error('Failed to refresh access token:', error);
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

