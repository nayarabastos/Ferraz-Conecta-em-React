import React from 'react';
import { TextInput, View } from 'react-native';

import PrototypeIcon from './PrototypeIcon';
import { colors, styles } from '../constants/theme';

export default function SearchBar({ placeholder, value, onChangeText, onFocus, containerStyle }) {
  return (
    <View style={[styles.inputWrap, { marginBottom: 14 }, containerStyle]}>
      <PrototypeIcon name="search" size={20} color={colors.muted} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
    </View>
  );
}
