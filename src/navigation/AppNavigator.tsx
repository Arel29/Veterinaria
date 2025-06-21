import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ClinicScreen from '../screens/ClinicScreen';
import InfoScreen from '../screens/InfoScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CitasScreen from '../screens/CitasScreen';
import MensajesScreen from '../screens/MensajesScreen';
import DocumentosScreen from '../screens/DocumentosScreen';
// Pantallas de ejemplo para las otras pestañas


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0a7ea4',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName = 'search';
          if (route.name === 'Buscar') iconName = 'search';
          else if (route.name === 'Citas') iconName = 'calendar';
          else if (route.name === 'Documentos') iconName = 'document-text';
          else if (route.name === 'Mensajes') iconName = 'chatbubbles';
          else if (route.name === 'Perfil') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Buscar" component={ClinicScreen} />
      <Tab.Screen name="Citas" component={CitasScreen} />
      <Tab.Screen name="Documentos" component={DocumentosScreen} />
      <Tab.Screen name="Mensajes" component={MensajesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Main" component={MainTabs} />
  </Stack.Navigator>
);

export default AppNavigator;