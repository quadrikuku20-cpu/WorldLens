import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StateDetailScreen({ route }) {
  // The state name (and the country) arrive from the Country Profile screen
  const { stateName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{stateName}</Text>
      <Text>City list coming soon.</Text>
    </View>
  );
}

// TODO (Yaa): show the cities of this state.
// 1. Add getCities(country, state) to src/services/locationService.js.
// 2. Fetch with useApiData(() => getCities(country, stateName), [country, stateName]).
// 3. Show the cities in a FlatList (keyExtractor = the city name).
// 4. Add a "Filter cities..." search box above the list that filters the array with useState.
// 5. Handle loading, error (with retry), and an empty state ("No cities found").

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
});