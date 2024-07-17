import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BECKAND_URL } from '../config';

export function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: ''
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
            const res = await axios.post(`${BECKAND_URL}/signup`, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', res.data.email);
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400 && error.response.data.message === "Email already exists") {
                    setEmailError("This email is already registered.");
                } else {
                    console.error('Error during signup:', error);
                }
            } else {
                console.error('Error during signup:', error);
            }
        }
    };
    const dummySumbit = async () => {
        setLoading(true);
        localStorage.setItem('email', "ankit@gmail.com");
        localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdjMzdjOTVlMTg5ZGIxNDdjNThhNSIsImlhdCI6MTcyMTIzMTgwOCwiZXhwIjoxNzIxMjM1NDA4fQ.4yC_lCE96lQRwVS6N-dh7rAHfjE7otf6YjlA8ameP2k");
        setLoading(false);
        navigate('/');
    }
    return (
        <div className="h-screen flex flex-col md:flex-row">
            <div className="md:w-1/2 rounded-lg hidden md:block">
                <img src="https://img.freepik.com/premium-vector/medical-booking-application-template-with-photo_23-2148569067.jpg?w=740"
                    alt="Medical"
                    className="max-w-full h-auto rounded-lg" />
            </div>
            <div className="md:w-1/2 flex items-center justify-center p-10 bg-white">
                <div className="w-full max-w-md">
                    <div className="text-3xl font-bold text-teal-700 mb-4">
                        Create an account
                    </div>
                    <div className="text-slate-400 mb-4">
                        Already have an account?
                        <Link className="underline text-teal-700 ml-1" to="/signin">
                            Sign in
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <LabelInput
                            label="Name"
                            name="name"
                            placeholder="Name"
                            onChange={handleInputChange}
                        />
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
                        <LabelInput
                            label="Age"
                            name="age"
                            type="number"
                            placeholder="Enter your age"
                            onChange={handleInputChange}
                        />
                        <LabelInput
                            label="Gender"
                            name="gender"
                            type="text"
                            placeholder="Enter your Gender"
                            onChange={handleInputChange}
                        />
                        <div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2"
                                >
                                    {loading ? "Please Wait..." : "Sign Up"}
                                </button>
                            </div>

                        </div>
                    </form>
                    <div>
                        <button onClick={dummySumbit}
                            type="submit"
                            className="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2"
                        >
                            {loading ? "Please Wait..." : "Sign Up without Credentials"}
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