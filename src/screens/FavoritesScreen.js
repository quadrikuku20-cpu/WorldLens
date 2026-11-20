import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useFavorites from '../hooks/useFavorites';

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.code}
        // Shown when nothing is saved yet
        ListEmptyComponent={
          <Text style={styles.muted}>No favorites yet. Tap the heart on a country to save it.</Text>
        }
        renderItem={({ item }) => (
          // TODO (Marc): replace this card with your <CountryCard /> component
          <TouchableOpacity
            style={styles.card}
            // Favorites is a different tab, so we go to Explore and then to the profile screen
            onPress={() => navigation.navigate('Explore', { screen: 'CountryProfile', params: { name: item.name } })}
          >
            {item.flag ? <Image source={{ uri: item.flag }} style={styles.flag} /> : <View style={styles.flag} />}
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.muted}>Capital: {item.capital}</Text>
            </View>
            {/* Tapping the heart removes the country from favorites */}
            <TouchableOpacity onPress={() => toggleFavorite(item)} hitSlop={10}>
              <Ionicons name="heart" size={22} color="#D64545" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 56, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2933', marginBottom: 16 },
  muted: { fontSize: 13, color: '#6B7280' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C9CED6',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  flag: { width: 64, height: 44, borderRadius: 4, backgroundColor: '#EEF0F3' },
  info: { flex: 1, marginLeft: 14 },
  name: { fontSize: 17, fontWeight: 'bold', marginBottom: 4 },
});