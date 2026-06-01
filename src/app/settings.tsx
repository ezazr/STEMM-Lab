import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function Settings() {
  const [message, setMessage] = useState("");

  function handleClearLocalData() {
    setMessage("Local data clear request completed. Offline storage will be connected later.");
  }

  function handleAbout() {
    setMessage(
      "STEMM Lab helps students complete real-world STEMM challenges using mobile data, sensors, GPS, timers, and activity results."
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>App preferences and project information</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Project</Text>
        <Text style={styles.cardText}>STEMM Lab – Real-World STEMM Games</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Data Storage</Text>
        <Text style={styles.cardText}>
          Activity results are stored using Firebase Firestore.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={() => router.push("/results")}>
        <Text style={styles.buttonText}>View Results</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push("/leaderboard")}>
        <Text style={styles.buttonText}>View Leaderboard</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={handleAbout}>
        <Text style={styles.secondaryText}>About App</Text>
      </Pressable>

      <Pressable style={styles.dangerButton} onPress={handleClearLocalData}>
        <Text style={styles.buttonText}>Clear Local Data</Text>
      </Pressable>

      {message !== "" && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 50,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginTop: 6,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardText: {
    color: "#555",
    lineHeight: 20,
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
  secondaryButton: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  secondaryText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  dangerButton: {
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 10,
    marginTop: 4,
  },
  messageBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  messageText: {
    color: "#111827",
    textAlign: "center",
    lineHeight: 20,
  },
});