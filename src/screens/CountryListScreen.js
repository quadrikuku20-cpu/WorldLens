import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useApiData from '../hooks/useApiData';
import { searchCountries, getCountriesByRegion } from '../services/countriesService';

export default function CountryListScreen({ route, navigation }) {
  // The Home screen sends either a search text (query) or a region
  const { query, region } = route.params;

  // Fetch whichever one we were given. The list [query, region] tells the hook
  // to fetch again if either value changes.
  const { data, loading, error, refetch } = useApiData(
    () => (query ? searchCountries(query) : getCountriesByRegion(region)),
    [query, region]
  );

  // The API already sorts A to Z, but we sort again to be safe
  // (copy the array first so we don't change the original)
  const countries = data ? [...data].sort((a, b) => a.name.localeCompare(b.name)) : [];

  // TODO (Marc): replace this loading block with your <LoadingSpinner /> component
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F5FA8" />
        <Text style={styles.message}>Loading countries...</Text>
      </View>
    );
  }

  // TODO (Marc): replace this block with your <ErrorMessage /> component (message + retry button)
  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={48} color="#6B7280" />
        <Text style={styles.message}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryText}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={countries}
      // keyExtractor gives each row a unique id: the 3-letter country code
      keyExtractor={(item) => item.code}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <Text style={styles.count}>
          {countries.length} {countries.length === 1 ? 'result' : 'results'}
        </Text>
      }
      // Shown only when the list is empty (for example, a search with no matches)
      ListEmptyComponent={<Text style={styles.message}>No countries found. Try another name.</Text>}
      renderItem={({ item }) => (
        // TODO (Marc): replace this card with your <CountryCard country={item} onPress={...} />
        <TouchableOpacity
          style={styles.card}
          // Open the profile and pass the country name along
          onPress={() => navigation.navigate('CountryProfile', { name: item.name })}
        >
          <Image source={{ uri: item.flag }} style={styles.flag} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>Capital: {item.capital}</Text>
            {/* population can be missing, so we fall back to N/A */}
            <Text style={styles.detail}>Population: {item.population?.toLocaleString() ?? 'N/A'}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, backgroundColor: '#FFFFFF', flexGrow: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  message: { marginTop: 12, fontSize: 14, color: '#6B7280', textAlign: 'center' },
  count: { fontSize: 13, color: '#6B7280', marginBottom: 12 },
  // Card: flag, text, and arrow side by side using flexDirection 'row'
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C9CED6',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  flag: { width: 64, height: 44, borderRadius: 4, borderWidth: 1, borderColor: '#E5E7EB' },
  info: { flex: 1, marginLeft: 14 },
  name: { fontSize: 17, fontWeight: 'bold', marginBottom: 4 },
  detail: { fontSize: 12, color: '#6B7280', marginBottom: 2 },
  retryButton: { marginTop: 16, backgroundColor: '#1F5FA8', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 20 },
  retryText: { color: '#FFFFFF', fontWeight: 'bold' },
});