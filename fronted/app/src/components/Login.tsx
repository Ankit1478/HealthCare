import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4">Log In</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mb-2 p-2 border border-gray-300 rounded w-full"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Log In</button>
            </form>
        </div>
    );
};
