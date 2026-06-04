import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PrototypeIcon from './PrototypeIcon';
import { colors, fonts, styles } from '../constants/theme';

const destinations = [
  ['home', 'home-outline', 'Tela Inicial'],
  ['jobs', 'briefcase-outline', 'Vagas de Emprego'],
  ['courses', 'school-outline', 'Cursos e Capacitações'],
  ['events', 'calendar-outline', 'Eventos da Cidade'],
  ['search', 'search-outline', 'Busca Avançada'],
  ['messages', 'chatbubble-outline', 'Mensagens'],
  ['notifications', 'notifications-outline', 'Notificações'],
  ['settings', 'settings', 'Configurações'],
  ['admin', 'stats-chart-outline', 'Minhas Estatísticas'],
];

export default function NavigationMenu({ visible, onClose, onNavigate }) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={local.backdrop}>
        <View style={local.drawer}>
          <View style={[styles.between, { marginBottom: 18 }]}>
            <Text style={styles.h2}>Menu</Text>
            <TouchableOpacity onPress={onClose}>
              <PrototypeIcon name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          {destinations.map(([destination, icon, label]) => (
            <TouchableOpacity
              key={destination}
              accessibilityRole="button"
              accessibilityLabel={`Ir para ${label}`}
              style={local.item}
              onPress={() => onNavigate(destination)}
            >
              <PrototypeIcon name={icon} size={21} color={colors.blue} />
              <Text style={local.text}>{label}</Text>
              <PrototypeIcon name="chevron-forward" size={17} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
      </View>
    </Modal>
  );
}

const local = StyleSheet.create({
  backdrop: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,42,0.34)',
  },
  drawer: {
    width: 304,
    paddingHorizontal: 20,
    paddingTop: 54,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 10,
  },
  item: {
    minHeight: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: 14,
    fontWeight: '500',
  },
});
