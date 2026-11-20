import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CountryProfileScreen({ route, navigation }) {
  // The country name arrives from the Country List screen
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text>Profile coming soon.</Text>
      {/* Temporary button to test navigation. Remove it when the real sections are in. */}
      <Button title="Open Lagos State (test)" onPress={() => navigation.navigate('StateDetail', { stateName: 'Lagos State' })} />
    </View>
  );
}

// TODO (Yaa): build the real profile page.
// 1. Fetch the country with useApiData(() => getCountryDetails(name), [name]).
//    Show a loading spinner and an error with a retry button, like CountryListScreen.
// 2. Replace the View with a ScrollView. Show sections in this order:
//    hero flag, About (Wikipedia), Quick facts, Leadership, Languages,
//    Currency, Weather, States, Neighbors.
// 3. Build each section with Marc's InfoCard, InfoRow, and SectionHeader components.
// 4. Make each section load on its own, so one failing API doesn't break the page.
// 5. In the States section, tapping a state should call:
//    navigation.navigate('StateDetail', { stateName, country: name }).
// 6. In Neighbors, tapping a country should call:
//    navigation.push('CountryProfile', { name }).

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
});