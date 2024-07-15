import axios from "axios";
import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";

export function History() {
    const [interactions, setInteractions] = useState<any[]>([]);
    const [expandedInteractionIds, setExpandedInteractionIds] = useState<string[]>([]);

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

    useEffect(() => {
        fetchInteractions();
    }, []);

    const toggleExpanded = (id: string) => {
        setExpandedInteractionIds(prev =>
            prev.includes(id)
                ? prev.filter(expandedId => expandedId !== id)
                : [...prev, id]
        );
    };

    return (
        <div>
            <Appbar />
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-bold text-teal-700 mb-4">Chat History</h2>
                {interactions.map((interaction) => (
                    <div key={interaction._id} className="mb-6 p-8 bg-gray-50 rounded-lg shadow-sm">
                        <p><strong>Doctor:</strong> {interaction.doctorId.name} </p>
                        <p><strong>Specialization:</strong> {interaction.doctorId.specialization}</p>
                        <p><strong>Query:</strong> {interaction.query}</p>
                        <p>
                            <strong>Response:</strong>
                            {expandedInteractionIds.includes(interaction._id)
                                ? interaction.response
                                : `${interaction.response.slice(0, 100)}...`}
                            <button
                                onClick={() => toggleExpanded(interaction._id)}
                                className="text-teal-600 hover:underline ml-2"
                            >
                                {expandedInteractionIds.includes(interaction._id) ? "see less" : "see more"}
                            </button>
                        </p>
                        <p><strong>Date:</strong> {new Date(interaction.interactionDate).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
