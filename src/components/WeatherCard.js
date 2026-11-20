import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { weatherDescription } from '../utils/formatters';

// `weather` is what getCurrentWeather returns: { temperature, humidity, windSpeed, code }
export default function WeatherCard({ weather }) {
  return (
    <View style={styles.card}>
      <Ionicons name="partly-sunny-outline" size={40} color="#F5A623" />
      <View style={styles.main}>
        <Text style={styles.temp}>{weather.temperature}°C</Text>
        <Text style={styles.desc}>{weatherDescription(weather.code)}</Text>
      </View>
      <View>
        <Text style={styles.detail}>Wind {weather.windSpeed} km/h</Text>
        <Text style={styles.detail}>Humidity {weather.humidity}%</Text>
      </View>
    </View>
  );
}

// TODO (Marc): pick the icon from the weather code (sun, cloud, rain, snow, storm).
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#C9CED6',
    borderRadius: 12,
    padding: 16,
  },
  main: { flex: 1, marginLeft: 14 },
  temp: { fontSize: 28, fontWeight: 'bold', color: '#1F2933' },
  desc: { fontSize: 12, color: '#6B7280' },
  detail: { fontSize: 11, color: '#6B7280', textAlign: 'right', marginBottom: 2 },
});