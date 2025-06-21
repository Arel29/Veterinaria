import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Info = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Veterinary Services Information</Text>
            <Text style={styles.description}>
                Our veterinary clinics offer a wide range of services to ensure the health and well-being of your pets. 
                Services include routine check-ups, vaccinations, emergency care, dental services, and more. 
                Our experienced veterinarians are dedicated to providing the best care for your furry friends.
            </Text>
            <Text style={styles.note}>
                For more information, please contact your nearest clinic or visit our website.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    note: {
        fontSize: 14,
        fontStyle: 'italic',
    },
});

export default Info;