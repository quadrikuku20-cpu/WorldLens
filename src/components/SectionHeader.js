import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Bold title above each section of the profile page
export default function SectionHeader({ title }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: 'bold', color: '#1F2933', marginTop: 24, marginBottom: 10 },
});