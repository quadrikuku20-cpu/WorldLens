import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// One row of the country list. `country` has { name, capital, population, flag }.
// The heart is optional: pass onToggleFavorite to show it.
export default function CountryCard({ country, onPress, isFavorite = false, onToggleFavorite }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: country.flag }} style={styles.flag} />
      <View style={styles.info}>
        <Text style={styles.name}>{country.name}</Text>
        <Text style={styles.detail}>Capital: {country.capital}</Text>
        <Text style={styles.detail}>Population: {country.population?.toLocaleString() ?? 'N/A'}</Text>
      </View>
      {onToggleFavorite ? (
        <TouchableOpacity onPress={onToggleFavorite} hitSlop={10}>
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={22} color="#D64545" />
        </TouchableOpacity>
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      )}
    </TouchableOpacity>
  );
}

// TODO (Marc): use this card in CountryListScreen and FavoritesScreen.
// Pass isFavorite and onToggleFavorite from useFavorites().
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C9CED6',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  flag: { width: 64, height: 44, borderRadius: 4, borderWidth: 1, borderColor: '#E5E7EB' },
  info: { flex: 1, marginLeft: 14 },
  name: { fontSize: 17, fontWeight: 'bold', marginBottom: 4 },
  detail: { fontSize: 12, color: '#6B7280', marginBottom: 2 },
});