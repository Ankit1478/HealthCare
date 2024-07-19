import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { z, ZodError } from 'zod';
import { BECKAND_URL } from '../config';

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

interface FormData {
    email: string;
    password: string;

}

interface Errors {
    email?: string;
    password?: string;
}

export function Login() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'age' ? parseInt(value) : value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            loginSchema.parse(formData);
            setLoading(true);
            const res = await axios.post(`${BECKAND_URL}/login`, formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', res.data.email);
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            if (error instanceof ZodError) {
                const validationErrors: Errors = {};
                error.errors.forEach((err) => {
                    validationErrors[err.path[0] as keyof FormData] = err.message;
                });
                setErrors(validationErrors);
            } else if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    if (error.response.data.message === "Invalid credentials") {
                        setErrors({ email: "Invalid email or password. Please sign up if you don't have an account." });
                    } else {
                        console.error('Error during login:', error);
                    }
                } else {
                    console.error('Error during login:', error);
                }
            } else {
                console.error('Error during login:', error);
            }
        }
    };

    const dummySubmit = async () => {
        setLoading(true);
        localStorage.setItem('email', "ankitraj@gmail.com");
        localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTdmOWFmMTQ3MDRiOWVmMDIzNjUwNSIsImlhdCI6MTcyMTIzNTg4N30.jWAIiTEzS20-Ze1uuvZqn1C8TfxK5DhhP1NF2o0gZ2k");
        setLoading(false);
        navigate('/');
    };

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
                                error={errors.email}
                            />
                        </div>
                        <LabelInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={handleInputChange}
                            error={errors.password}
                        />
                        <div>
                            <button
                                type="submit"
                                className="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2"
                            >
                                {loading ? "Please Wait..." : "Sign in"}
                            </button>
                        </div>
                    </form>
                    <div>
                        <button onClick={dummySubmit}
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
    name: keyof FormData;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
}

const LabelInput: React.FC<LabelInputProps> = ({ label, name, placeholder, onChange, type = "text", error }) => {
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};
