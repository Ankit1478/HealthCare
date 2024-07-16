import axios from "axios";
import { useState, useEffect } from "react";
import { BECKAND_URL } from "../config";


export interface Doctor {
    _id: string;
    name: string;
    image: string;
    specialization: string;
}

export function useDoctorDetails() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`${BECKAND_URL}/doctordetails`)
            .then(response => {
                setDoctors(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
                setLoading(false);
            });
    }, []);
    return { doctors, loading };
}