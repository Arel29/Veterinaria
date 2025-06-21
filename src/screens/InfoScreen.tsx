import React from 'react';
import { StyleSheet, View } from 'react-native';
import Info from '../components/Info';

const InfoScreen = () => {
    return (
        <View style={styles.container}>
            <Info />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default InfoScreen;