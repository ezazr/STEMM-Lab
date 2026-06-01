import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import * as Location from "expo-location";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function LocationScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [status, setStatus] = useState("Location not loaded");

  async function getLocation() {
    try {
      setStatus("Requesting permission...");

      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        setStatus("Location permission denied");
        Alert.alert("Permission Denied", "Please allow location permission.");
        return;
      }

      setStatus("Getting current location...");

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
      setStatus("Location loaded successfully");
    } catch (error: any) {
      setStatus("Location failed");
      Alert.alert("Location Error", error.message);
    }
  }

  async function saveLocation() {
    if (latitude === null || longitude === null) {
      Alert.alert(
        "No Location Found",
        "Please click Get Current Location before saving."
      );
      return;
    }

    try {
      await addDoc(collection(db, "deviceLogs"), {
        feature: "GPS Location",
        latitude,
        longitude,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Saved", "Location saved to Firebase.");
      setStatus("Location saved to Firebase");
    } catch (error: any) {
      setStatus("Firebase save failed");
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GPS Location</Text>
      <Text style={styles.subtitle}>Device Capability Feature</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>
          {latitude === null ? "Not Available" : latitude.toFixed(6)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.value}>
          {longitude === null ? "Not Available" : longitude.toFixed(6)}
        </Text>
      </View>

      <Text style={styles.status}>{status}</Text>

      <Pressable style={styles.button} onPress={getLocation}>
        <Text style={styles.buttonText}>Get Current Location</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={saveLocation}>
        <Text style={styles.buttonText}>Save Location</Text>
      </Pressable>
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
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  label: {
    color: "#555",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  status: {
    textAlign: "center",
    marginVertical: 12,
    color: "#2563EB",
    fontWeight: "600",
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
});