import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as Battery from "expo-battery";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function BatteryScreen() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [batteryState, setBatteryState] = useState("Not checked yet");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBatteryInfo();
  }, []);

  async function loadBatteryInfo() {
    try {
      const level = await Battery.getBatteryLevelAsync();
      const state = await Battery.getBatteryStateAsync();

      setBatteryLevel(Math.round(level * 100));

      if (state === Battery.BatteryState.CHARGING) setBatteryState("Charging");
      else if (state === Battery.BatteryState.FULL) setBatteryState("Full");
      else if (state === Battery.BatteryState.UNPLUGGED) setBatteryState("Unplugged");
      else setBatteryState("Unknown");

      setMessage("Battery information refreshed.");
    } catch (error: any) {
      setMessage("Battery API may not work properly on web. Test on Expo Go phone.");
      Alert.alert("Battery Error", error.message);
    }
  }

  async function saveBatteryInfo() {
    try {
      await addDoc(collection(db, "deviceLogs"), {
        feature: "Battery API",
        batteryLevel: batteryLevel ?? "Not available",
        batteryState,
        lowBatteryWarning: batteryLevel !== null && batteryLevel < 20,
        createdAt: serverTimestamp(),
      });

      setMessage("Battery log saved to Firebase.");
    } catch (error: any) {
      setMessage("Firebase save failed.");
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Status</Text>
      <Text style={styles.subtitle}>Device Capability Feature</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Battery Level</Text>
        <Text style={styles.value}>
          {batteryLevel === null ? "Not available" : `${batteryLevel}%`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Charging Status</Text>
        <Text style={styles.value}>{batteryState}</Text>
      </View>

      <Pressable style={styles.button} onPress={loadBatteryInfo}>
        <Text style={styles.buttonText}>Refresh Battery</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={saveBatteryInfo}>
        <Text style={styles.buttonText}>Save Battery Log</Text>
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
  container: { flex: 1, padding: 24, backgroundColor: "#F5F7FA", justifyContent: "center" },
  title: { fontSize: 34, fontWeight: "bold", color: "#2563EB", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#555", marginBottom: 24, marginTop: 6 },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  label: { fontSize: 16, color: "#555" },
  value: { fontSize: 26, fontWeight: "bold", marginTop: 6 },
  button: { backgroundColor: "#2563EB", padding: 15, borderRadius: 10, marginBottom: 12 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  messageBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginTop: 10,
  },
  messageText: {
    textAlign: "center",
    color: "#111827",
  },
});