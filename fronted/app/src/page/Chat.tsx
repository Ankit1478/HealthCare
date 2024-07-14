import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';

export function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const result = await axios.get('http://localhost:3000/specializations');
                setSpecializations(result.data);
            } catch (error) {
                console.error('Error fetching specializations:', error);
            }
        };

        fetchSpecializations();
    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const result = await axios.post(
                'http://localhost:3000/chat',
                { specialization: selectedSpecialization, query },
                { headers: { Authorization: token } }
            );
            const newMessage = {
                query,
                response: result.data.response,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setLoading(false);
            setQuery('');
        } catch (error: any) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.error('Error during chat:', error);
            }
        }
    };

    return (
        <div className="fixed bottom-5 right-5">
            <button
                onClick={togglePopup}
                className="bg-[#0e8f83] text-white p-3 rounded-full shadow-lg"
            >
                💬
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeDialog}>
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black opacity-30" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="bg-white rounded-lg max-w-md mx-auto p-5 w-full z-50">
                                <div className="flex flex-col h-full text-gray-800">
                                    <div className="flex items-center justify-between p-4 border-b border-blue-200 bg-blue-100">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg font-semibold text-green-900">Chat</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button onClick={closeDialog} className="text-xl font-bold">
                                                &times;
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-50 max-h-80">
                                        {messages.map((message, index) => (
                                            <div key={index} className="space-y-4">
                                                <div className="flex justify-end">
                                                    <div className="bg-blue-600 text-white p-3 rounded-lg shadow-md">
                                                        {message.query}
                                                    </div>
                                                </div>
                                                <div className="flex items-start space-x-2">
                                                    <div className="bg-white text-gray-800 p-3 rounded-lg shadow-md border border-blue-200">
                                                        {message.response}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {error && (
                                            <div className="text-red-600">
                                                {error}
                                            </div>
                                        )}
                                    </div>

                                    <form onSubmit={handleSubmit} className="p-4 border-t border-blue-200 bg-blue-100">
                                        <div className="flex flex-col space-y-2">
                                            <select
                                                value={selectedSpecialization}
                                                onChange={(e) => setSelectedSpecialization(e.target.value)}
                                                className="p-2 border border-gray-300 rounded"
                                            >
                                                <option value="">Select Specialization</option>
                                                {specializations.map((spec) => (
                                                    <option key={spec} value={spec}>
                                                        {spec}
                                                    </option>
                                                ))}
                                            </select>
                                            <textarea
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Enter your query"
                                                className="p-2 border border-gray-300 rounded-lg h-20"
                                            />
                                            <button type="submit" className="w-full bg-[#0e8f83] text-white p-2 rounded">
                                                {loading ? "Wait.." : "Ask"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default Chat;
