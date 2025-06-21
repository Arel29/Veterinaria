import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const conversations = [
  {
    id: '1',
    name: 'Veterinaria Patitas Felices',
    lastMessage: '¡Hola! ¿En qué podemos ayudarte?',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    messages: [
      { id: '1', from: 'clinic', text: '¡Hola! ¿En qué podemos ayudarte?' },
      { id: '2', from: 'user', text: 'Hola, ¿tienen servicio de urgencias hoy?' },
      { id: '3', from: 'clinic', text: 'Sí, estamos disponibles las 24 horas.' },
    ],
  },
  {
    id: '2',
    name: 'Clínica Animalitos',
    lastMessage: 'Recuerda tu cita mañana a las 10am.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    messages: [
      { id: '1', from: 'clinic', text: 'Recuerda tu cita mañana a las 10am.' },
    ],
  },
];

const MensajesScreen = () => {
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() && selectedChat) {
      const newMsg = { id: Date.now().toString(), from: 'user', text: input };
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, newMsg],
      });
      setInput('');
    }
  };

  // Actualiza la conversación en la lista principal al enviar mensaje
  const handleCloseChat = () => {
    if (selectedChat) {
      const idx = conversations.findIndex(c => c.id === selectedChat.id);
      if (idx !== -1) {
        conversations[idx] = {
          ...selectedChat,
          lastMessage: selectedChat.messages[selectedChat.messages.length - 1].text,
        };
      }
    }
    setSelectedChat(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mensajes</Text>
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => setSelectedChat(item)}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatar}>{item.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      {/* Modal de chat */}
      <Modal visible={!!selectedChat} animationType="slide">
        <View style={styles.chatContainer}>
          <Text style={styles.chatHeader}>{selectedChat?.name}</Text>
          <FlatList
            data={selectedChat?.messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={[
                styles.message,
                item.from === 'user' ? styles.userMsg : styles.clinicMsg
              ]}>
                <Text style={styles.msgText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingVertical: 16 }}
          />
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje..."
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Enviar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={handleCloseChat}>
            <Text style={styles.closeBtnText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc', padding: 12 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#0a7ea4', marginBottom: 8, textAlign: 'center' },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e6f2f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatar: { fontSize: 22, color: '#0a7ea4', fontWeight: 'bold' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  lastMsg: { fontSize: 14, color: '#888', marginTop: 2 },
  chatContainer: { flex: 1, backgroundColor: '#f7fafc', padding: 12 },
  chatHeader: { fontSize: 18, fontWeight: 'bold', color: '#0a7ea4', marginBottom: 8, textAlign: 'center' },
  message: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  userMsg: {
    backgroundColor: '#0a7ea4',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
  },
  clinicMsg: {
    backgroundColor: '#e6f2f8',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,
  },
  msgText: { color: '#222', fontSize: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0a7ea4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  closeBtn: {
    marginTop: 16,
    alignSelf: 'center',
    backgroundColor: '#e6f2f8',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  closeBtnText: { color: '#0a7ea4', fontWeight: 'bold', fontSize: 16 },
});

export default MensajesScreen;