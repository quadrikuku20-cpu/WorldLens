// useState lets the screen remember what the user typed
import React, { useState } from 'react';
// Basic building blocks from React Native
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// Ionicons gives us the search icon
import { Ionicons } from '@expo/vector-icons';

// The regions shown as chips (same ones the REST Countries API uses)
const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
// Example searches shown in the tip box
const EXAMPLES = ['Nigeria', 'Canada', 'Japan'];

// navigation is given to every screen by React Navigation
export default function HomeScreen({ navigation }) {
  // query stores the text typed in the search bar; setQuery updates it
  const [query, setQuery] = useState('');

  // Runs when the user presses search on the keyboard
  const searchCountry = (text) => {
    // trim() removes extra spaces at the start and end
    const cleaned = text.trim();
    // Do nothing if the box is empty
    if (cleaned.length === 0) return;
    // Open the list screen and pass the search text along
    navigation.navigate('CountryList', { query: cleaned });
  };

  // Runs when a region chip is tapped
  const openRegion = (region) => {
    // Open the list screen and pass the chosen region along
    navigation.navigate('CountryList', { region });
  };

  return (
    // ScrollView keeps the screen usable on small phones
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.subtitle}>Explore any country in one place</Text>

      {/* TODO (Marc): replace this block with your <SearchBar /> component */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#6B7280" />
        <TextInput
          style={styles.input}
          placeholder="Search a country..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => searchCountry(query)}
          returnKeyType="search"
        />
      </View>

      <Text style={styles.sectionTitle}>Browse by region</Text>

      {/* TODO (Marc): replace these buttons with your <RegionChip /> component */}
      <View style={styles.chipRow}>
        {REGIONS.map((region) => (
          <TouchableOpacity key={region} style={styles.chip} onPress={() => openRegion(region)}>
            <Text style={styles.chipText}>{region}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tip box with example searches the user can tap */}
      <View style={styles.tipBox}>
        <Text style={styles.tipLabel}>Try searching for</Text>
        <View style={styles.tipRow}>
          {EXAMPLES.map((name) => (
            <TouchableOpacity key={name} onPress={() => searchCountry(name)}>
              <Text style={styles.tipLink}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Styles use Flexbox: flexDirection, padding, margin, alignItems
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFFFFF', flexGrow: 1 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  // Rounded gray bar with the icon and the text box side by side
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF0F3',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 28,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  // flexWrap moves chips to the next row when the row is full
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 28 },
  chip: {
    borderWidth: 1,
    borderColor: '#C9CED6',
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { fontSize: 13 },
  tipBox: { backgroundColor: '#DCE8F5', borderRadius: 14, padding: 16 },
  tipLabel: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
  tipRow: { flexDirection: 'row' },
  tipLink: { fontSize: 15, fontWeight: 'bold', color: '#1F5FA8', marginRight: 18 },
});