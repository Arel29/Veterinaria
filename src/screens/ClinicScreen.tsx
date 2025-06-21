import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CATEGORIES = [
  { name: 'Consulta', icon: '🐶' },
  { name: 'Vacunas', icon: '💉' },
  { name: 'Estética', icon: '✂️' },
  { name: 'Urgencias', icon: '🚑' },
  { name: 'Farmacia', icon: '💊' },
  { name: 'Guardería', icon: '🏠' },
];

const CLINICS = [
  {
    id: '1',
    name: 'Clínica Veterinaria Jardín de la Fauna',
    rating: 4.5,
    reviews: 275,
    category: 'Consulta',
    address: 'De Morelos 299-B C, Col. Centro, 38000 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    tlf: '+52 4616138355',
  },
  {
    id: '2',
    name: 'Canis et Felis - Clínica Veterinaria',
    rating: 4.7,
    reviews: 290,
    category: 'Vacunas',
    address: 'Roble 410, Los Laureles, 38020 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    tlf: '+52 4611379264',
  },
  {
    id: '3',
    name: 'Veterinaria Jardines de Celaya',
    rating: 4.7,
    reviews: 252,
    category: 'Urgencias',
    address: '38078, Plan de Ayutla 110, El Vergel, 38078 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
    tlf: '+52 4612197069'
  },
  {
    id: '4',
    name: 'Veterianria Mundo Kan',
    rating: 4.6,
    reviews: 419,
    category: 'Estética',
    address: 'Av. Salvador Ortega 175, La Capilla, 38013 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/68.jpg',
    tlf: '+52 4612133854'
  },
  {
    id: '5',
    name: 'Clinica Veterianria Kenya',
    rating: 4.4,
    reviews: 267,
    category: 'Farmacia',
    address: 'Av El Sauz 551-1, Los Laureles, 38020 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    tlf: '52 4616144170'

  },
  {
    id: '6',
    name: 'Clinica Veterinaria Mutualismo',
    rating: 3.8,
    reviews: 287,
    category: 'Guardería',
    address: 'Mutualismo 605-Local B, Residencial Celaya Centro, 38060 Celaya, Gto., México ',
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
    tlf: '+52 4616155620',
  },
  {
    id: '7',
    name: 'Clinica Veternaria Daktary',
    rating: 4.6,
    reviews: 73,
    category: 'Consulta',
    address: 'José María Pino Suárez 210, El Vergel, 38078 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/women/51.jpg',
    tlf: '+52 4616162230',
  },
  {
    id: '8',
    name: 'Veterinaria Make Vet',
    rating: 4.7,
    reviews: 89,
    category: 'Vacunas',
    address: 'Francisco Juárez 506 D, Los angeles, 38040 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/52.jpg',
    tlf: '+52 4612543161',
  },
  {
    id: '9',
    name: 'Clinica Veterinaria Quiron',
    rating: 4.6,
    reviews: 347,
    category: 'Urgencias',
    address: 'Av Oro 803, Zona de Oro II, 38016 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/53.jpg',
    tlf: '+52 4611310649',
  },
  { 
    id: '10',
    name: 'Hosptal Veterinario OneVet',
    rating: 4.7,
    reviews: 262,
    category: 'Urgencias',
    address: 'P.º de Guanajuato 612, Jardines de Celaya 3ra Secc, 38080 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    tlf: '+52 4616131129',
  },
  {
    id: '11',
    name: 'Veterinaria Guadalajara',
    rating: 4.7,
    reviews: 40,
    category: 'Estética',
    address: 'esquina con el Sauz, Vicente Fox 500-local 2, Imperial, 38028 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
    tlf: '+52 4611216718',
  },
  {
    id: '12',
    name: 'Clinica Veterinaria',
    rating: 4.5,
    reviews: 65,
    category: 'Farmacia',
    address: 'Av El Sauz 1546, Imperial, 38028 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/56.jpg',
    tlf: '+52 4611576354',
  },
  {
    id: '13',
    name: 'PetVetCel',
    rating: 4.6,
    reviews: 142,
    category: 'Guardería',
    address: 'Av Irrigación 423, Villa de Benavente, 38034 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/57.jpg',
    tlf: '+52 4616086317',
  },
  {
    id: '14',
    name: 'CEVET',
    rating: 4.6,
    reviews: 254,
    category: 'Consulta',
    address: 'Francisco I. Madero 355, Col. Centro, 38000 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/58.jpg',
    tlf: '+52 4616128672',
  },
  {
    id: '15',
    name: 'Veterinarias M.V.Z. Lázaro Delgado Sánchez',
    rating: 4.9,
    reviews: 50,
    category: 'Vacunas',
    address: 'Celaya-Dolores Hidalgo, 10 de Abril, 38018 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/59.jpg',
    tlf: '+52 4616177956',
  },
  {
    id: '16',
    name: 'Veterinaria Animalitoys',
    rating: 4.4,
    reviews: 135,
    category: 'Urgencias',
    address: 'Tomas Sánchez Hernández 137, Zona del Oro 1, 38020 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/60.jpg',
    tlf: '+52 4616141554',
  },
  {
    id: '17',
    name: 'Veterinaria Miguel Delgado',
    rating: 4.7,
    reviews: 56,
    category: 'Estética',
    address: 'Miguel Hidalgo 703, Centro, 38000 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/61.jpg',
    tlf: '+52 4616158928',
  },
  {
    id: '18',
    name: 'RO CA VET servicios veterinarios',
    rating: 4.3,
    reviews: 218,
    category: 'Farmacia',
    address: 'Boulevard Adolfo López Mateos 1016, Metro Plaza Sn, Barrio de Santo Cristo, 38060 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/62.jpg',
    tlf: '+52 4612161609',
  },
  {
    id: '19',
    name: 'Veterinaria Boulevard',
    rating: 4.2,
    reviews: 71,
    category: 'Guardería',
    address: 'Blvrd Adolfo López Mateos 413, Col. Centro, 38000 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/63.jpg',
    tlf: '+52 4612150596',
  },
  {
    id: '20',
    name: 'Veterinaria Renacimiento',
    rating: 4.5,
    reviews: 25,
    category: 'Consulta',
    address: 'Diego Velásquez 204, Renacimiento, 38060 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/64.jpg',
    tlf: '+52 4616121287',
  },
  {
    id: '21',
    name: 'Veterinaria Sabuesos Celaya',
    rating: 2.6,
    reviews: 10,
    category: 'Vacunas',
    address: 'Av Irrigación 230, Emiliano Zapata, 38030 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/65.jpg',
    tlf: '+52 4616134143',
  },
  {
    id: '22',
    name: 'Veterinaria Del Centro',
    rating: 4.4,
    reviews: 85,
    category: 'Urgencias',
    address: 'Blvrd Adolfo López Mateos 415, Col. Centro, 38000 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/66.jpg',
    tlf: '+52 4611223366',
  },
  {
    id: '23',
    name: 'Veterinaria kala. MVZ Marcelino Villalobos',
    rating: 4.7,
    reviews: 50,
    category: 'Estética',
    address: 'Benito Juárez 447, Col. Centro, 38000 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    tlf: '+52 4613134030',
  },
  {
    id: '24',
    name: 'Animal Care Hospital Veterinario',
    rating: 3.0,
    reviews: 280,
    category: 'Farmacia',
    address: '38048, Constitución 143, U.H. de Tierras Negras, 38040 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/men/68.jpg',
    tlf: '+52 4616141000',
  },  
  {
    id: '25',
    name: 'Veterinaria Hakuna Matata',
    rating: 4.6,
    reviews: 59,
    category: 'Guardería',
    address: 'Diego Rivera 316, Col. Centro, 38000 Celaya, Gto., México',
    image: 'https://randomuser.me/api/portraits/woman/69.jpg',
    tlf: '+2 4612201635',
  }
  // agregar mas clinicas
];

const ClinicScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredClinics = CLINICS.filter(
    c =>
      (!selectedCategory || c.category === selectedCategory) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.address.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola, Usuario.</Text>
      <TextInput
        style={styles.search}
        placeholder="Busca una veterinaria o servicio"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.categories}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.name}
            style={[
              styles.categoryBtn,
              selectedCategory === cat.name && styles.categoryBtnSelected,
            ]}
            onPress={() => setSelectedCategory(cat.name === selectedCategory ? null : cat.name)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Veterinarias cercanas</Text>
      <FlatList
        data={filteredClinics}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.clinicName}>{item.name}</Text>
              <Text style={styles.rating}>
                {'★'.repeat(Math.round(item.rating))} {item.rating} · {item.reviews} opiniones
              </Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  greeting: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#0a7ea4' },
  search: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  categories: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, gap: 8 },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryBtnSelected: {
    backgroundColor: '#0a7ea4',
  },
  categoryIcon: { fontSize: 18, marginRight: 4 },
  categoryText: { fontSize: 15, color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  clinicName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  rating: { fontSize: 14, color: '#0a7ea4', marginBottom: 2 },
  category: { fontSize: 13, color: '#888' },
  address: { fontSize: 13, color: '#666' },
});

export default ClinicScreen;