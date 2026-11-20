import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Spinner with a short message. Use it while data is loading.
export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1F5FA8" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

// TODO (Marc): add a `small` prop for a smaller version used inside one section.
const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  message: { marginTop: 12, fontSize: 14, color: '#6B7280' },
});