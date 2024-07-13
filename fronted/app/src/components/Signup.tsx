import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Appbar } from './Appbar';

export const Signup: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', age: '', gender: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/signup', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl mb-4">Sign Up</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
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
                    <input
                        type="text"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
                </form>
            </div>
        </div>
    );
};
