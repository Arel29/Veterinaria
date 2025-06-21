import axios from 'axios';
import { getCurrentLocation } from '../utils/location';

const API_URL = 'https://api.example.com/veterinary-clinics'; // Replace with actual API URL

export const getNearbyClinics = async () => {
    try {
        const location = await getCurrentLocation();
        const response = await axios.get(`${API_URL}?lat=${location.latitude}&lng=${location.longitude}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nearby clinics:', error);
        throw error;
    }
};