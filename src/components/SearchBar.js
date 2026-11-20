import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Rounded search box. The screen owns the text, so it passes value and onChangeText in.
export default function SearchBar({ value, onChangeText, onSubmit, placeholder = 'Search a country...' }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#6B7280" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        returnKeyType="search"
      />
    </View>
  );
}

// TODO (Marc): add a clear (X) button that shows only when value is not empty.
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF0F3',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 15 },
});