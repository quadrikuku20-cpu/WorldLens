import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// One line of a fact: label on the left, value on the right
export default function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ?? 'N/A'}</Text>
    </View>
  );
}

// TODO (Marc): make long values (like several languages) wrap nicely to the next line.
const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  label: { fontSize: 13, color: '#6B7280' },
  value: { fontSize: 13, fontWeight: 'bold', color: '#1F2933', flexShrink: 1, textAlign: 'right' },
});