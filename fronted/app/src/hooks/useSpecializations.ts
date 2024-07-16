import { useState, useEffect } from 'react';
import axios from 'axios';
import { BECKAND_URL } from '../config';

export const useSpecializations = () => {
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSpecializations = async () => {
        try {
            const result = await axios.get(`${BECKAND_URL}/specializations`);
            setSpecializations(result.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching specializations:', error);
            setError('Error fetching specializations');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpecializations();
    }, []);

    return { specializations, loading, error };
};
