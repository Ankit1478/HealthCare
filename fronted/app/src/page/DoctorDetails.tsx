import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Typography, Avatar, Paper, CircularProgress, Alert, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Appbar } from '../components/Appbar';
import { BECKAND_URL } from '../config';
import Chat from './Chat';

interface Doctor {
    name: string;
    image: string;
    specialization: string;
    bio: string;
}

interface Interaction {
    _id: string;
    query: string;
    response: string;
    interactionDate: string;
    doctorId: string;
    patientId: string;
}

const DoctorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Interaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedInteractionIds, setExpandedInteractionIds] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get<Doctor>(`${BECKAND_URL}/doctordetails/${id}`);
                setDoctor(response.data);
            } catch (err) {
                setError('Failed to fetch doctor details');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [id]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Please log in.');
                    setLoading(false);
                    navigate("/signin");
                    return;
                }

                const response = await axios.get<Interaction[]>(`${BECKAND_URL}/interactions/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                setConversations(response.data);
            } catch (err) {
                setError('Error fetching conversations');
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [id]);

    if (loading) {
        return <div className="text-center text-gray-500"><CircularProgress /></div>;
    }

    if (error) {
        return <div className="text-center text-red-500"><Alert severity="error">{error}</Alert></div>;
    }

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
            <Container maxWidth="md">
                {doctor && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                            <div className="flex items-center">
                                <Avatar src={doctor.image} alt={doctor.name} sx={{ width: 56, height: 56, mr: 2 }} />
                                <div>
                                    <Typography variant="h5" component="div">{doctor.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{doctor.specialization} specialist</Typography>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Typography variant="h6">{doctor?.name}  is a skilled professional dedicated to diagnosing, treating, and preventing illnesses, thereby saving lives and promoting health</Typography>
                            </div>
                        </Paper>
                    </motion.div>
                )}
                <div>
                    <Typography variant="h6">Your Conversations with {doctor?.name}</Typography>
                    {conversations.length === 0 ? (
                        <Typography>No conversations found with this doctor.</Typography>
                    ) : (
                        <List>
                            {conversations.map((conversation) => (
                                <React.Fragment key={conversation._id}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            primary={`Query: ${conversation.query}`}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="textPrimary">
                                                        <p>
                                                            <strong>Response:</strong>
                                                            {expandedInteractionIds.includes(conversation._id)
                                                                ? conversation.response
                                                                : `${conversation.response.slice(0, 100)}...`}
                                                            <button
                                                                onClick={() => toggleExpanded(conversation._id)}
                                                                className="text-teal-600 hover:underline ml-2"
                                                            >
                                                                {expandedInteractionIds.includes(conversation._id) ? "see less" : "see more"}
                                                            </button>
                                                        </p>
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2" color="textSecondary">
                                                        Date: {new Date(conversation.interactionDate).toLocaleString()}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))}
                        </List>
                    )}
                </div>
            </Container>
            {doctor && (
                <Chat doctorId={id || ""} specialization={doctor.specialization} />
            )}
        </div>
    );
};

export default DoctorDetails;
