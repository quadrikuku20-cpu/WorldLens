import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text>Saved countries will appear here.</Text>
    </View>
  );
}

// TODO (Marc): show the saved countries.
// 1. Build FavoritesContext and useFavorites so the app has a favorites list.
// 2. Read the list with useFavorites() and show it in a FlatList of CountryCard components.
// 3. Tapping a card should open the profile:
//    navigation.navigate('Explore', { screen: 'CountryProfile', params: { name } }).
//    (Add { navigation } to this component's props.)
// 4. Add an empty state: "No favorites yet. Tap the heart on a country to save it."

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
});