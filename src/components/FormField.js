import React from 'react';
import { TextInput, View } from 'react-native';

import PrototypeIcon from './PrototypeIcon';
import { colors, styles } from '../constants/theme';

export default function FormField({ icon, placeholder, secureTextEntry, keyboardType, value, onChangeText }) {
  return (
    <View style={styles.inputWrap}>
      <PrototypeIcon name={icon} size={19} color={colors.muted} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
