import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useApiData from '../hooks/useApiData';
import { getCities } from '../services/locationService';

export default function StateDetailScreen({ route }) {
  // The state name and the country arrive from the profile screen
  const { stateName, country } = route.params;
  // filter holds the text typed in the "Filter cities" box
  const [filter, setFilter] = useState('');

  const { data, loading, error, refetch } = useApiData(() => getCities(country, stateName), [country, stateName]);

  // Keep only the cities that contain the typed text (ignoring upper and lower case)
  const cities = (data ?? []).filter((city) => city.toLowerCase().includes(filter.toLowerCase()));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F5FA8" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>{error}</Text>
        <TouchableOpacity onPress={refetch}>
          <Text style={styles.link}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{stateName}</Text>
      <Text style={styles.muted}>{country}</Text>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#6B7280" />
        <TextInput
          style={styles.input}
          placeholder="Filter cities..."
          placeholderTextColor="#6B7280"
          value={filter}
          onChangeText={setFilter}
        />
      </View>

      <FlatList
        data={cities}
        // Two cities can share a name, so the index is added to keep keys unique
        keyExtractor={(item, index) => `${item}-${index}`}
        ListEmptyComponent={<Text style={styles.muted}>No cities found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color="#1F5FA8" />
            <Text style={styles.city}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2933' },
  muted: { fontSize: 13, color: '#6B7280' },
  link: { fontSize: 14, color: '#1F5FA8', fontWeight: 'bold', marginTop: 8 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF0F3',
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 42,
    marginVertical: 16,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 14 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C9CED6',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  city: { marginLeft: 10, fontSize: 15, fontWeight: 'bold', color: '#1F2933' },
});