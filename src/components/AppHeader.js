import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PrototypeIcon from './PrototypeIcon';
import { colors, styles } from '../constants/theme';

export default function AppHeader({
  title,
  setScreen,
  backTo,
  action = 'notifications-outline',
  onAction,
  showLogo = false,
  flushBottom = false,
}) {
  const handleAction =
    onAction || (action.includes('notifications') ? () => setScreen('notifications') : undefined);

  return (
    <View style={[local.shell, flushBottom && local.flushBottom]}>
      {backTo ? (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          style={styles.iconButton}
          onPress={() => setScreen(backTo)}
        >
          <PrototypeIcon name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
      ) : showLogo ? (
        <View style={[styles.row, { gap: 6, flex: 1 }]}>
          <Image
            source={require('../../assets/logo_azul.png')}
            style={local.brandMark}
            resizeMode="contain"
          />
          <Text style={[styles.h2, { flexShrink: 1 }]}>Ferraz Conecta</Text>
        </View>
      ) : (
        <Text style={[styles.h1, { flex: 1 }]}>{title}</Text>
      )}

      {backTo && <Text style={[styles.h2, { flex: 1, textAlign: 'center' }]}>{title}</Text>}

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={action === 'menu' ? 'Abrir menu' : action.includes('notifications') ? 'Abrir notificações' : title}
        style={styles.iconButton}
        onPress={handleAction}
      >
        <PrototypeIcon name={action} size={21} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const local = StyleSheet.create({
  shell: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0F172A',
    shadowOpacity: 0.035,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 3,
  },
  brandMark: {
    width: 54,
    height: 54,
  },
  flushBottom: {
    marginBottom: 0,
    borderBottomWidth: 0,
  },
});
