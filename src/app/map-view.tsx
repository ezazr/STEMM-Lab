import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { useState } from "react";
import * as Location from "expo-location";

export default function MapViewScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [status, setStatus] = useState("Current location not loaded yet.");

  async function getCurrentLocation() {
    try {
      setStatus("Requesting location permission...");

      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        setStatus("Location permission denied.");
        return;
      }

      setStatus("Getting current location...");

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
      setStatus("Current location loaded successfully.");
    } catch (error: any) {
      setStatus(error.message);
    }
  }

  function openMap() {
    if (latitude === null || longitude === null) {
      setStatus("Please get current location first.");
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map View</Text>
      <Text style={styles.subtitle}>Live GPS Map Feature</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Current Latitude</Text>
        <Text style={styles.value}>
          {latitude === null ? "Not loaded" : latitude.toFixed(6)}
        </Text>

        <Text style={styles.label}>Current Longitude</Text>
        <Text style={styles.value}>
          {longitude === null ? "Not loaded" : longitude.toFixed(6)}
        </Text>
      </View>

      <Text style={styles.status}>{status}</Text>

      <Pressable style={styles.button} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>Get Current Location</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={openMap}>
        <Text style={styles.buttonText}>Open Current Location in Google Maps</Text>
      </Pressable>

      <Text style={styles.note}>
        This feature uses GPS coordinates and opens the exact location in Google Maps.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2563EB",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
    marginTop: 6,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  label: {
    fontSize: 15,
    color: "#555",
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 8,
  },
  status: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "600",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  note: {
    textAlign: "center",
    color: "#555",
    marginTop: 12,
    lineHeight: 20,
  },
});