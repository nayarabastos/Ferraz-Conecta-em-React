import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import PrototypeIcon from './PrototypeIcon';
import { colors, styles } from '../constants/theme';

export default function Chips({ items, activeIndex = 0, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
      {items.map((item, index) => {
        const active = index === activeIndex;
        const label = typeof item === 'string' ? item : item.label;
        const icon = typeof item === 'string' ? null : item.icon;

        return (
          <TouchableOpacity
            key={label}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onChange && onChange(index)}
          >
            {icon && (
              <PrototypeIcon
                name={icon}
                size={14}
                color={active ? colors.white : colors.blue}
              />
            )}
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
