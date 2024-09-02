import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/login', { email, password });

            const credentials = { 
                email, 
                accessToken: response.data.accessToken, 
                refreshToken: response.data.refreshToken 
            };
            localStorage.setItem('auth', JSON.stringify(credentials));
            login(credentials);
            navigate('/'); 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert('Failed to login: ' + (error.response?.data.error || error.message)); 
            } else {
                alert('Failed to login: An unexpected error occurred.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
