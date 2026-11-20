import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Error text with an optional "Try again" button. onRetry usually comes from useApiData's refetch.
export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={48} color="#6B7280" />
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

// TODO (Marc): use this and LoadingSpinner in CountryListScreen in place of the inline blocks.
const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  message: { marginTop: 12, fontSize: 14, color: '#6B7280', textAlign: 'center' },
  button: { marginTop: 16, backgroundColor: '#1F5FA8', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 20 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
});