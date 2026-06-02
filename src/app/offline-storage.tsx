import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";

type OfflineResult = {
  id: number;
  activityName: string;
  resultSummary: string;
};

export default function OfflineStorageWeb() {
  const [results, setResults] = useState<OfflineResult[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("offline_results");
    if (saved) setResults(JSON.parse(saved));
  }, []);

  function saveOfflineResult() {
    const newResult = {
      id: Date.now(),
      activityName: "Offline Test Activity",
      resultSummary: "Saved locally in browser storage as web fallback",
    };

    const updated = [newResult, ...results];
    localStorage.setItem("offline_results", JSON.stringify(updated));
    setResults(updated);
    setMessage("Offline result saved locally on web.");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Offline Storage</Text>
      <Text style={styles.subtitle}>Web fallback for local offline storage</Text>

      <Pressable style={styles.button} onPress={saveOfflineResult}>
        <Text style={styles.buttonText}>Save Offline Test Result</Text>
      </Pressable>

      {message !== "" && <Text style={styles.message}>{message}</Text>}

      {results.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.activityName}</Text>
          <Text style={styles.cardText}>{item.resultSummary}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: "#F5F7FA", flexGrow: 1 },
  title: { fontSize: 34, fontWeight: "bold", color: "#2563EB", textAlign: "center", marginTop: 40 },
  subtitle: { textAlign: "center", color: "#555", marginTop: 6, marginBottom: 24 },
  button: { backgroundColor: "#2563EB", padding: 15, borderRadius: 10, marginBottom: 16 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  message: { textAlign: "center", color: "#2563EB", fontWeight: "600", marginBottom: 16 },
  card: { backgroundColor: "white", padding: 18, borderRadius: 14, marginBottom: 14, borderWidth: 1, borderColor: "#E5E7EB" },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardText: { color: "#555", marginTop: 6 },
});