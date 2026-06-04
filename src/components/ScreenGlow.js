import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ScreenGlow({ height = 340 }) {
  return (
    <View pointerEvents="none" style={[local.wrap, { height }]}>
      <LinearGradient
        colors={[
          'rgba(219,234,254,1)',
          'rgba(236,253,245,0.92)',
          'rgba(239,246,255,0.64)',
          'rgba(255,255,255,0)',
        ]}
        locations={[0, 0.42, 0.72, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const local = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: -24,
    right: -24,
  },
});
