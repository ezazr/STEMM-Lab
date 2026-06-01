import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function NotificationsScreen() {
  const [message, setMessage] = useState("");

  async function sendStudyReminder() {
    setMessage("Button clicked. Processing notification...");

    try {
      if (Platform.OS === "web") {
        await addDoc(collection(db, "deviceLogs"), {
          feature: "Notifications",
          platform: "web",
          status: "Notification simulated on web",
          message: "Time to complete your next STEMM challenge.",
          createdAt: serverTimestamp(),
        });

        setMessage("Web notification simulated and saved to Firebase.");
        return;
      }

      const permission = await Notifications.requestPermissionsAsync();

      if (!permission.granted) {
        setMessage("Notification permission denied.");
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "STEMM Lab Reminder",
          body: "Time to complete your next STEMM challenge.",
        },
        trigger: {
          seconds: 5,
        } as Notifications.NotificationTriggerInput,
      });

      await addDoc(collection(db, "deviceLogs"), {
        feature: "Notifications",
        platform: Platform.OS,
        status: "Notification scheduled",
        message: "Time to complete your next STEMM challenge.",
        createdAt: serverTimestamp(),
      });

      setMessage("Notification scheduled and saved to Firebase.");
    } catch (error: any) {
      console.log("Notification error:", error);
      setMessage(`Error: ${error.message}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Device Capability Feature</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Study Reminder</Text>
        <Text style={styles.cardText}>
          Sends a STEMM challenge reminder. On web, the notification is simulated and logged to Firebase.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={sendStudyReminder}>
        <Text style={styles.buttonText}>Send Test Notification</Text>
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
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  cardText: { color: "#555", lineHeight: 20 },
  button: { backgroundColor: "#2563EB", padding: 15, borderRadius: 10 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  messageBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginTop: 18,
  },
  messageText: {
    textAlign: "center",
    color: "#111827",
    lineHeight: 20,
  },
});