// src/App.tsx

import React from 'react';

// Dummy data
const dummyProfile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 30,
};

const dummyInteractions = [
    { date: '2024-07-14T12:00:00Z', message: 'Hello, how can I help you today?' },
    { date: '2024-07-13T12:00:00Z', message: 'What are your symptoms?' },
];

const dummyDoctor = {
    name: 'Dr. Jane Smith',
    specialty: 'Cardiology',
    contact: 'dr.smith@example.com',
};

// Profile Component
interface ProfileProps {
    profile: {
        name: string;
        email: string;
        age: number;
    };
}

const Profile: React.FC<ProfileProps> = ({ profile }) => (
    <div className="card bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-2">Profile</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Age:</strong> {profile.age}</p>
    </div>
);

// Interactions Component
interface InteractionData {
    date: string;
    message: string;
}

interface InteractionsProps {
    interactions: InteractionData[];
}

const Interactions: React.FC<InteractionsProps> = ({ interactions }) => (
    <div className="card bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-2">Interaction History</h2>
        <ul>
            {interactions.map((interaction, index) => (
                <li key={index} className="border-b py-2">
                    <p><strong>Date:</strong> {new Date(interaction.date).toLocaleString()}</p>
                    <p><strong>Message:</strong> {interaction.message}</p>
                </li>
            ))}
        </ul>
    </div>
);

// DoctorInfo Component
interface DoctorInfoProps {
    doctorInfo: {
        name: string;
        specialty: string;
        contact: string;
    };
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctorInfo }) => (
    <div className="card bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-2">Doctor Information</h2>
        <p><strong>Name:</strong> {doctorInfo.name}</p>
        <p><strong>Specialty:</strong> {doctorInfo.specialty}</p>
        <p><strong>Contact:</strong> {doctorInfo.contact}</p>
    </div>
);

// Dashboard Component
const Dashboard: React.FC = () => (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Profile profile={dummyProfile} />
            <Interactions interactions={dummyInteractions} />
            <DoctorInfo doctorInfo={dummyDoctor} />
        </div>
    </div>
);

export default Dashboard;