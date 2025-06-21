import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getNearbyClinics } from '../services/clinicService';
import { Clinic } from '../types';

const ClinicList: React.FC = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const data = await getNearbyClinics();
                setClinics(data);
            } catch (err) {
                setError('Failed to load clinics');
            } finally {
                setLoading(false);
            }
        };

        fetchClinics();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <FlatList
            data={clinics}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.address}</Text>
                </View>
            )}
        />
    );
};

export default ClinicList;