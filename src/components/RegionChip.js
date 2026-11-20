import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Small rounded button. selected = true shows it in blue.
export default function RegionChip({ label, selected = false, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

// TODO (Marc): use this component in HomeScreen in place of the inline chip buttons.
const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: '#C9CED6',
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: { backgroundColor: '#1F5FA8', borderColor: '#1F5FA8' },
  text: { fontSize: 13, color: '#1F2933' },
  textSelected: { color: '#FFFFFF', fontWeight: 'bold' },
});