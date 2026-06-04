import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PrototypeIcon from './PrototypeIcon';
import { colors, fonts, screenMaxWidth } from '../constants/theme';

const items = [
  { key: 'home', icon: 'home', label: 'Home' },
  { key: 'jobs', icon: 'briefcase', label: 'Vagas' },
  { key: 'courses', icon: 'school', label: 'Cursos' },
  { key: 'events', icon: 'calendar', label: 'Eventos' },
  { key: 'profile', icon: 'person', label: 'Perfil' },
];

export default function BottomNav({ screen, setScreen }) {
  return (
    <View style={localStyles.shell}>
      <View style={localStyles.nav}>
        {items.map((item) => {
          const active = screen === item.key;

          return (
            <TouchableOpacity
              key={item.key}
              style={localStyles.item}
              onPress={() => setScreen(item.key)}
              activeOpacity={0.8}
            >
              <PrototypeIcon
                name={item.icon}
                size={23}
                color={active ? colors.blue : colors.muted}
              />
              <Text style={[localStyles.label, active && localStyles.labelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  shell: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E1E5EA',
  },
  nav: {
    width: '100%',
    maxWidth: screenMaxWidth,
    minHeight: 66,
    paddingBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    width: 66,
    minHeight: 53,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    color: colors.muted,
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 10,
  },
  labelActive: {
    color: colors.blue,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
});
