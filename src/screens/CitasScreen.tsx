import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configura el idioma español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ],
  monthNamesShort: [
    'Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'
  ],
  dayNames: [
    'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'
  ],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

type Appointment = {
  date: string;
  title: string;
};

const CitasScreen = () => {
  const [selected, setSelected] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // Marcar días con citas
  const markedDates = appointments.reduce((acc, cita) => {
    acc[cita.date] = {
      marked: true,
      dotColor: '#0a7ea4',
      selected: cita.date === selected,
      selectedColor: cita.date === selected ? '#0a7ea4' : undefined,
    };
    return acc;
  }, {} as Record<string, any>);

  if (selected && !markedDates[selected]) {
    markedDates[selected] = {
      selected: true,
      selectedColor: '#0a7ea4',
    };
  }

  const citasDelDia = appointments.filter(c => c.date === selected);

  const handleAddAppointment = () => {
    if (selected && newTitle.trim()) {
      setAppointments([...appointments, { date: selected, title: newTitle }]);
      setModalVisible(false);
      setNewTitle('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus citas</Text>
      <Calendar
        onDayPress={day => setSelected(day.dateString)}
        markedDates={markedDates}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: '#0a7ea4',
          todayTextColor: '#0a7ea4',
          arrowColor: '#0a7ea4',
        }}
      />
      <View style={styles.citasContainer}>
        {selected ? (
          citasDelDia.length > 0 ? (
            citasDelDia.map((cita, idx) => (
              <View key={idx} style={styles.citaCard}>
                <Text style={styles.citaText}>• {cita.title}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.info}>No tienes citas programadas para el {selected}.</Text>
          )
        ) : (
          <Text style={styles.info}>Selecciona un día para ver o agendar citas.</Text>
        )}
      </View>
      {selected ? (
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.addBtnText}>+ Agendar nueva cita</Text>
        </TouchableOpacity>
      ) : null}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva cita para {selected}</Text>
            <TextInput
              style={styles.input}
              placeholder="Motivo de la cita"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#888" />
              <Button title="Guardar" onPress={handleAddAppointment} color="#0a7ea4" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0a7ea4', marginBottom: 16, textAlign: 'center' },
  calendar: { borderRadius: 12, elevation: 2, marginBottom: 24 },
  citasContainer: { minHeight: 60, marginBottom: 16 },
  info: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 16 },
  citaCard: { backgroundColor: '#e6f2f8', borderRadius: 8, padding: 10, marginBottom: 8 },
  citaText: { fontSize: 16, color: '#0a7ea4' },
  addBtn: {
    backgroundColor: '#0a7ea4',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
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
    width: '85%',
    elevation: 4,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#0a7ea4' },
  input: {
    borderWidth: 1,
    borderColor: '#0a7ea4',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
  },
});

export default CitasScreen;