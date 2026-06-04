import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import PrototypeIcon from './PrototypeIcon';
import { colors } from '../constants/theme';

export default function CarouselControls({ index, total, onPrevious, onNext, onSelect }) {
  if (total <= 1) return null;

  return (
    <View style={local.wrap}>
      <TouchableOpacity accessibilityLabel="Item anterior" style={local.button} onPress={onPrevious}>
        <PrototypeIcon name="chevron-back" size={14} color={colors.blue} />
      </TouchableOpacity>
      <View style={local.dots}>
        {Array.from({ length: total }).map((_, itemIndex) => (
          <TouchableOpacity
            key={itemIndex}
            accessibilityLabel={`Ir para item ${itemIndex + 1}`}
            style={[local.dot, itemIndex === index && local.dotActive]}
            onPress={() => onSelect(itemIndex)}
          />
        ))}
      </View>
      <TouchableOpacity accessibilityLabel="Próximo item" style={local.button} onPress={onNext}>
        <PrototypeIcon name="chevron-forward" size={14} color={colors.blue} />
      </TouchableOpacity>
    </View>
  );
}

const local = StyleSheet.create({
  wrap: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    marginTop: -4,
    marginBottom: 8,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.lightBlue,
  },
});
