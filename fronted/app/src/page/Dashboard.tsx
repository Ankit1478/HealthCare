import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from '../components/Appbar';

export const Dashboard: React.FC = () => {
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [response, setResponse] = useState<string>('');

    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const result = await axios.get("http://localhost:3000/specializations");
                setSpecializations(result.data);
            } catch (error) {
                console.error('Error fetching specializations:', error);
            }
        };

        fetchSpecializations();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const result = await axios.post('http://localhost:3000/chat', { specialization: selectedSpecialization, query }, {
                headers: { Authorization: token }
            });
            setResponse(result.data.response);
        } catch (error) {
            console.error('Error during chat:', error);
        }
    };

    return (
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl mb-4">Dashboard</h2>
                    <select
                        value={selectedSpecialization}
                        onChange={(e) => setSelectedSpecialization(e.target.value)}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">Select Specialization</option>
                        {specializations.map((spec) => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter your query"
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Ask</button>
                    {response && <div className="mt-4 bg-gray-100 p-2 rounded">{response}</div>}
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
