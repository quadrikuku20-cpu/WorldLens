import { Ionicons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import useCountryProfile from "../hooks/useCountryProfile";
import useFavorites from "../hooks/useFavorites";
import {
    formatArea,
    formatPopulation,
    weatherDescription,
} from "../utils/formatters";

// One section of the page: shows a spinner, an error with retry, or its content.
// TODO (Yaa): replace the inline Section, Row, and weather box with SectionHeader,
// InfoCard, InfoRow, and WeatherCard.
function Section({ title, loading, error, onRetry, children }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      {loading ? (
        <ActivityIndicator color="#1F5FA8" />
      ) : error ? (
        <View>
          <Text style={styles.muted}>{error}</Text>
          {onRetry ? (
            <TouchableOpacity onPress={onRetry}>
              <Text style={styles.link}>Try again</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        children
      )}
    </View>
  );
}

// One line of a fact: label on the left, value on the right
function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ?? "N/A"}</Text>
    </View>
  );
}

export default function CountryProfileScreen({ route, navigation }) {
  // The country name arrives from the list screen (or from a neighbor chip)
  const { name } = route.params;
  const { country, wiki, weather, leaders, states, neighbors } =
    useCountryProfile(name);
  const { toggleFavorite, isFavorite } = useFavorites();
  const info = country.data;

  // The main country details must load first. Without them we show only a spinner or error.
  if (country.loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F5FA8" />
      </View>
    );
  }
  if (country.error || !info) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>
          {country.error ?? "Country not found."}
        </Text>
        <TouchableOpacity onPress={country.refetch}>
          <Text style={styles.link}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const heads = leaders.data;
  // In some countries the president is also the head of government: show one row then
  const sameLeader = heads && heads.headOfState === heads.headOfGovernment;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero: flag with a heart to save the country */}
      <View style={styles.hero}>
        {info.flag ? (
          <Image
            source={{ uri: info.flag }}
            style={styles.heroFlag}
            resizeMode="contain"
          />
        ) : null}
        <TouchableOpacity
          style={styles.heart}
          onPress={() =>
            toggleFavorite({
              code: info.code,
              name: info.name,
              capital: info.capital,
              population: info.population,
              flag: info.flag,
            })
          }
        >
          <Ionicons
            name={isFavorite(info.code) ? "heart" : "heart-outline"}
            size={24}
            color="#D64545"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{info.name}</Text>
      <Text style={styles.muted}>
        {info.officialName ?? info.name} • {info.region}
      </Text>

      <Section
        title="About"
        loading={wiki.loading}
        error={wiki.error}
        onRetry={wiki.refetch}
      >
        {/* Wikipedia's picture is often the flag again, so skip it when the file name says "flag_of" */}
        {wiki.data?.image &&
        !wiki.data.image.toLowerCase().includes("flag_of") ? (
          <Image
            source={{ uri: wiki.data.image }}
            style={styles.wikiImage}
            resizeMode="cover"
          />
        ) : null}
        <Text style={styles.body}>
          {wiki.data?.extract ?? "No description available."}
        </Text>
      </Section>

      <Section title="Quick facts">
        <View style={styles.card}>
          <Row label="Capital" value={info.capital} />
          <Row label="Region" value={info.subregion ?? info.region} />
          <Row label="Population" value={formatPopulation(info.population)} />
          <Row label="Area" value={formatArea(info.area)} />
          <Row label="Calling code" value={info.callingCode} />
          <Row label="Timezone" value={info.timezones[0]} />
        </View>
      </Section>

      <Section
        title="Leadership"
        loading={leaders.loading}
        error={leaders.error}
        onRetry={leaders.refetch}
      >
        <View style={styles.card}>
          {heads?.headOfState ? (
            <Row
              label={sameLeader ? "President" : "Head of state"}
              value={heads.headOfState}
            />
          ) : (
            <Text style={styles.muted}>Not available.</Text>
          )}
          {heads?.headOfGovernment && !sameLeader ? (
            <Row label="Head of government" value={heads.headOfGovernment} />
          ) : null}
        </View>
      </Section>

      <Section title="Languages">
        <View style={styles.chipRow}>
          {info.languages.length ? (
            info.languages.map((language) => (
              <View key={language} style={styles.chip}>
                <Text style={styles.chipText}>{language}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.muted}>Not available.</Text>
          )}
        </View>
      </Section>

      <Section title="Currency">
        <View style={styles.card}>
          <Text style={styles.body}>
            {info.currencies.length
              ? info.currencies.join(", ")
              : "Not available."}
          </Text>
        </View>
      </Section>

      <Section
        title={`Weather in ${info.capital}`}
        loading={weather.loading}
        error={weather.error}
        onRetry={weather.refetch}
      >
        {weather.data ? (
          <View style={[styles.card, styles.weatherCard]}>
            <Text style={styles.temp}>{weather.data.temperature}°C</Text>
            <View>
              <Text style={styles.body}>
                {weatherDescription(weather.data.code)}
              </Text>
              <Text style={styles.muted}>
                Wind {weather.data.windSpeed} km/h
              </Text>
              <Text style={styles.muted}>
                Humidity {weather.data.humidity}%
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.muted}>Not available.</Text>
        )}
      </Section>

      <Section
        title="States and provinces"
        loading={states.loading}
        error={states.error}
        onRetry={states.refetch}
      >
        {states.data && states.data.length ? (
          <View style={styles.chipRow}>
            {states.data.map((state) => (
              <TouchableOpacity
                key={state.name}
                style={styles.chip}
                // Open the state screen and pass the state name and the country
                onPress={() =>
                  navigation.navigate("StateDetail", {
                    stateName: state.name,
                    country: name,
                  })
                }
              >
                <Text style={styles.chipText}>{state.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.muted}>Not available.</Text>
        )}
      </Section>

      <Section
        title="Neighbors"
        loading={neighbors.loading}
        error={neighbors.error}
        onRetry={neighbors.refetch}
      >
        {neighbors.data && neighbors.data.length ? (
          <View style={styles.chipRow}>
            {neighbors.data.map((neighbor) => (
              <TouchableOpacity
                key={neighbor.code}
                style={styles.chip}
                // push opens another profile on top, so Back returns to this country
                onPress={() =>
                  navigation.push("CountryProfile", { name: neighbor.name })
                }
              >
                <Text style={styles.chipText}>{neighbor.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.muted}>No land borders.</Text>
        )}
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 48, backgroundColor: "#FFFFFF" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
    hero: {
    height: 170,
    backgroundColor: "#EEF0F3",
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#C9CED6",
  
  },
  heroFlag: { width: "100%", height: "100%" },
  // The heart sits on top of the flag in the corner (absolute positioning)
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 8,
  },
  name: { fontSize: 28, fontWeight: "bold", color: "#1F2933" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2933",
    marginTop: 24,
    marginBottom: 10,
  },
  body: { fontSize: 14, color: "#1F2933", lineHeight: 20 },
  muted: { fontSize: 13, color: "#6B7280" },
  link: { fontSize: 14, color: "#1F5FA8", fontWeight: "bold", marginTop: 8 },
  wikiImage: { width: "100%", height: 160, borderRadius: 12, marginBottom: 10 },
  card: {
    borderWidth: 1,
    borderColor: "#C9CED6",
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  label: { fontSize: 13, color: "#6B7280" },
  value: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1F2933",
    flexShrink: 1,
    textAlign: "right",
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    borderWidth: 1,
    borderColor: "#C9CED6",
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { fontSize: 13, color: "#1F2933" },
  weatherCard: { flexDirection: "row", alignItems: "center" },
  temp: { fontSize: 32, fontWeight: "bold", color: "#1F2933", marginRight: 20 },
});
