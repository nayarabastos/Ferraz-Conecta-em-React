import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PrototypeIcon from './PrototypeIcon';
import { colors, fonts, styles } from '../constants/theme';

export default function SectionHeader({ title, action, onPress, large = false }) {
  return (
    <View style={[styles.between, { marginTop: 20, marginBottom: 12 }]}>
      <Text style={[styles.h2, large && local.largeTitle]}>{title}</Text>
      {action && (
        <TouchableOpacity style={styles.row} onPress={onPress} disabled={!onPress}>
          <Text style={styles.linkText}>{action}</Text>
          <PrototypeIcon name="chevron-forward" size={16} color={colors.lightBlue} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const local = StyleSheet.create({
  largeTitle: {
    fontFamily: fonts.bold,
    fontSize: 23,
    fontWeight: '700',
  },
});
