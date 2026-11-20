import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Title bar with optional text underneath
export default function Header({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

// TODO (Marc): add an optional icon on the left (Ionicons) and use this on the Home screen.
const styles = StyleSheet.create({
  container: { paddingVertical: 12 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1F2933' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
});