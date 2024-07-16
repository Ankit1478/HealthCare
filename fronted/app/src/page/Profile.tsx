import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chat } from './Chat';
import { Appbar } from '../components/Appbar';
import { BECKAND_URL } from '../config';
import { Spinner } from '../components/Spinner';

export const Profile: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [interactions, setInteractions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get(`${BECKAND_URL}/profile`, {
                    headers: { Authorization: token }
                });
                setProfile(result.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchInteractions = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get(`${BECKAND_URL}/interactions`, {
                    headers: { Authorization: token }
                });
                setInteractions(result.data);
            } catch (error) {
                console.error('Error fetching interactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        fetchInteractions();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />
            <Chat />
            <div className="container mx-auto p-6">
                {loading ? (
                    <div className="w-screen h-screen flex justify-center items-center">
                        <Spinner />
                    </div>
                ) : (
                    profile && (
                        <div>
                            <div className="mb-10 bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-3xl font-bold text-teal-700 mb-4">Profile</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p><strong>Name:</strong> {profile.name}</p>
                                    <p><strong>Email:</strong> {profile.email}</p>
                                    <p><strong>Age:</strong> {profile.age}</p>
                                    <p><strong>Gender:</strong> {profile.gender}</p>
                                </div>
                            </div>
                            <div>
                                <div className="bg-white shadow-lg rounded-lg p-6">
                                    <h2 className="text-3xl font-bold text-teal-700 mb-4">Linked Doctor</h2>
                                    {interactions.map((interaction) => (
                                        <div key={interaction._id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                                            <p><strong>Doctor:</strong> {interaction.doctorId.name}</p>
                                            <p><strong>Specialization:</strong> {interaction.doctorId.specialization}</p>
                                            <p><strong>Query:</strong> {interaction.query}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};