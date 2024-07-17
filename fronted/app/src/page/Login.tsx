import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BECKAND_URL } from '../config';

export function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'email') setEmailError("");
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${BECKAND_URL}/login`, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', res.data.email);
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };
    const dummySumbit = async () => {
        setLoading(true);
        localStorage.setItem('email', "ankit@gmail.com");
        localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdjMzdjOTVlMTg5ZGIxNDdjNThhNSIsImlhdCI6MTcyMTIyMzc5MywiZXhwIjoxNzIxMjI3MzkzfQ.q6d2D00Xs6HVKFkIt5lPu_awbKT_U9qZuySO7C_Qo0A");
        setLoading(false);
        navigate('/');
        setLoading(false);
    }

    return (
        <div className="h-screen flex flex-col md:flex-row">
            <div className="md:w-1/2  rounded-lg hidden md:block">
                <img src="https://img.freepik.com/premium-vector/medical-booking-application-template-with-photo_23-2148569067.jpg?w=740"
                    alt="Medical"
                    className="max-w-full h-auto rounded-lg" />
            </div>
            <div className="md:w-1/2 flex items-center justify-center p-10 bg-white">
                <div className="w-full max-w-md">
                    <div className="text-3xl font-bold text-teal-700 mb-4">
                        Login
                    </div>
                    <div className="text-slate-400 mb-4">
                        Don't have an account?
                        <Link className="underline text-teal-700 ml-1" to="/signup">
                            Sign up
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <LabelInput
                                label="Email"
                                name="email"
                                placeholder="ankit@gmail.com"
                                onChange={handleInputChange}
                                type="email"
                            />
                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                        </div>
                        <LabelInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={handleInputChange}
                        />


                        <div>
                            <button
                                type="submit"
                                className="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div>
                        <button onClick={dummySumbit}
                            type="submit"
                            className="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2"
                        >
                            {loading ? "Please Wait..." : "Sign in without Credentials"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LabelInputProps {
    label: string;
    name: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const LabelInput = ({ label, name, placeholder, onChange, type = "text" }: LabelInputProps) => {
    return (
        <div>
            <label className="block mb-2 text-sm text-gray-900 font-bold">{label}</label>
            <input
                name={name}
                onChange={onChange}
                type={type}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
};
