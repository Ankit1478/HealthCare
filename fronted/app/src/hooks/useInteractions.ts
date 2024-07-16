import { useState, useEffect } from 'react';
import axios from 'axios';
import { BECKAND_URL } from '../config';

export const useInteractions = () => {
    const [interactions, setInteractions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInteractions = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await axios.get(`${BECKAND_URL}/interactions`, {
                headers: { Authorization: token }
            });
            setInteractions(result.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching interactions:', error);
            setError('Error fetching interactions');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInteractions();
    }, []);

    return { interactions, loading, error };
};
