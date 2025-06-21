import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, FlatList, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const initialDocs = [
  {
    id: '1',
    title: 'Carnet de Vacunación',
    date: '2024-06-01',
    type: 'vacuna',
  },
  {
    id: '2',
    title: 'Receta médica - Otitis',
    date: '2024-05-15',
    type: 'receta',
  },
  {
    id: '3',
    title: 'Estudio de sangre',
    date: '2024-04-10',
    type: 'estudio',
  },
];

const iconByType = {
  vacuna: 'medkit',
  receta: 'document-text',
  estudio: 'flask',
  otro: 'folder',
};

const DocumentosScreen = () => {
  const [documentos, setDocumentos] = useState(initialDocs);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('vacuna');
  const [newDate, setNewDate] = useState('');

  const handleAddDocument = () => {
    if (!newTitle.trim() || !newDate.trim()) return;
    setDocumentos([
      ...documentos,
      {
        id: Date.now().toString(),
        title: newTitle,
        date: newDate,
        type: newType,
      },
    ]);
    setModalVisible(false);
    setNewTitle('');
    setNewType('vacuna');
    setNewDate('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus documentos</Text>
      <FlatList
        data={documentos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Ionicons
              name={iconByType[item.type] as any}
              size={28}
              color="#0a7ea4"
              style={{ marginRight: 12 }}
            />
            <View>
              <Text style={styles.docTitle}>{item.title}</Text>
              <Text style={styles.docDate}>Fecha: {item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No tienes documentos guardados aún.</Text>
        }
      />
      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={28} color="#fff" />
        <Text style={styles.addBtnText}>Subir documento</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo documento</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha (YYYY-MM-DD)"
              value={newDate}
              onChangeText={setNewDate}
            />
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[styles.typeBtn, newType === 'vacuna' && styles.typeBtnSelected]}
                onPress={() => setNewType('vacuna')}
              >
                <Ionicons name="medkit" size={20} color={newType === 'vacuna' ? '#fff' : '#0a7ea4'} />
                <Text style={[styles.typeText, newType === 'vacuna' && { color: '#fff' }]}>Vacuna</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, newType === 'receta' && styles.typeBtnSelected]}
                onPress={() => setNewType('receta')}
              >
                <Ionicons name="document-text" size={20} color={newType === 'receta' ? '#fff' : '#0a7ea4'} />
                <Text style={[styles.typeText, newType === 'receta' && { color: '#fff' }]}>Receta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, newType === 'estudio' && styles.typeBtnSelected]}
                onPress={() => setNewType('estudio')}
              >
                <Ionicons name="flask" size={20} color={newType === 'estudio' ? '#fff' : '#0a7ea4'} />
                <Text style={[styles.typeText, newType === 'estudio' && { color: '#fff' }]}>Estudio</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, newType === 'otro' && styles.typeBtnSelected]}
                onPress={() => setNewType('otro')}
              >
                <Ionicons name="folder" size={20} color={newType === 'otro' ? '#fff' : '#0a7ea4'} />
                <Text style={[styles.typeText, newType === 'otro' && { color: '#fff' }]}>Otro</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalActions}>
              <Button title="Cancelar" color="#888" onPress={() => setModalVisible(false)} />
              <Button title="Guardar" color="#0a7ea4" onPress={handleAddDocument} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0a7ea4', marginBottom: 16, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f2f8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  docTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  docDate: { fontSize: 14, color: '#888' },
  empty: { textAlign: 'center', color: '#888', marginTop: 32, fontSize: 16 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginTop: 16,
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: Platform.OS === 'web' ? 400 : '85%',
    elevation: 4,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#0a7ea4' },
  input: {
    borderWidth: 1,
    borderColor: '#0a7ea4',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  typeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  typeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0a7ea4',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 6,
    backgroundColor: '#fff',
  },
  typeBtnSelected: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  typeText: { marginLeft: 4, color: '#0a7ea4', fontWeight: 'bold' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
});

export default DocumentosScreen;