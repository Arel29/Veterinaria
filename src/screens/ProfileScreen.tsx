import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';

const user = {
  name: 'Usuario',
  email: 'usuario@email.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const ProfileScreen = () => {
  const handleHelp = () => {
    Alert.alert('Ayuda', 'Para soporte, escribe a soporte@veterinaria.com');
  };

  const handleLogout = () => {
    // Aquí puedes limpiar el estado de autenticación y navegar al login
    Alert.alert('Cerrar sesión', 'Has cerrado sesión.');
    // navigation.navigate('Login'); // Si usas navegación
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity style={styles.optionBtn} onPress={handleHelp}>
          <Text style={styles.optionText}>🛈 Ayuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionBtn, styles.logoutBtn]} onPress={handleLogout}>
          <Text style={[styles.optionText, { color: '#fff' }]}>⎋ Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Veterinaria App © 2025</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc', alignItems: 'center', padding: 24 },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 32 },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 12, borderWidth: 2, borderColor: '#0a7ea4' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#0a7ea4' },
  email: { fontSize: 15, color: '#888', marginBottom: 8 },
  options: { width: '100%', marginTop: 16 },
  optionBtn: {
    backgroundColor: '#e6f2f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: '#0a7ea4',
  },
  optionText: { fontSize: 18 },
  footer: { position: 'absolute', bottom: 24, color: '#bbb', fontSize: 13 },
});

export default ProfileScreen;