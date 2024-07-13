import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Profile: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [interactions, setInteractions] = useState<any[]>([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get('http://localhost:3000/profile', {
                    headers: { Authorization: token }
                });
                setProfile(result.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        const fetchInteractions = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get('http://localhost:3000/interactions', {
                    headers: { Authorization: token }
                });
                setInteractions(result.data);
            } catch (error) {
                console.error('Error fetching interactions:', error);
            }
        };

        fetchProfile();
        fetchInteractions();
    }, []);

    return (
        <div className="p-6">
            {profile && (
                <div className="mb-6">
                    <h2 className="text-2xl mb-2">Profile</h2>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Age:</strong> {profile.age}</p>
                    <p><strong>Gender:</strong> {profile.gender}</p>
                </div>
            )}
            <div>
                <h2 className="text-2xl mb-2">Chat History</h2>
                {interactions.map((interaction) => (
                    <div key={interaction._id} className="mb-4 p-4 bg-gray-100 rounded">
                        <p><strong>Doctor:</strong> {interaction.doctorId.name} ({interaction.doctorId.specialization})</p>
                        <p><strong>Query:</strong> {interaction.query}</p>
                        <p><strong>Response:</strong> {interaction.response}</p>
                        <p><strong>Date:</strong> {new Date(interaction.interactionDate).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
