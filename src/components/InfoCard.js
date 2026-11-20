import React from 'react';
import { View, StyleSheet } from 'react-native';

// White rounded box that holds InfoRow items (or anything else)
export default function InfoCard({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#C9CED6',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
});