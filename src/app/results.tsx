import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { router } from "expo-router";

type ResultItem = {
  id: string;
  activityName?: string;
  participantName?: string;
  reflection?: string;
  observation?: string;
  finalVelocity?: number;
  noiseLevel?: number;
  bendAngleDegrees?: number;
  heartRateIncrease?: number;
  reactionDifference?: number;
  breathingIncrease?: number;
  movementCm?: number;
};

export default function Results() {
  const [results, setResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    loadResults();
  }, []);

  async function loadResults() {
    const q = query(
      collection(db, "activityResults"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ResultItem[];

    setResults(data);
  }

  function getMainResult(item: ResultItem) {
    if (item.finalVelocity !== undefined) return `${item.finalVelocity.toFixed(2)} m/s`;
    if (item.noiseLevel !== undefined) return `${item.noiseLevel} dB`;
    if (item.bendAngleDegrees !== undefined) return `${item.bendAngleDegrees}° bend`;
    if (item.heartRateIncrease !== undefined) return `+${item.heartRateIncrease} bpm`;
    if (item.reactionDifference !== undefined) return `${item.reactionDifference.toFixed(2)} sec difference`;
    if (item.breathingIncrease !== undefined) return `+${item.breathingIncrease} breaths/min`;
    if (item.movementCm !== undefined) return `${item.movementCm} cm movement`;
    return "Saved result";
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Text style={styles.subtitle}>Saved STEMM Lab activity results</Text>

      <Pressable style={styles.button} onPress={() => router.push("/leaderboard")}>
        <Text style={styles.buttonText}>View Leaderboard</Text>
      </Pressable>

      {results.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.activity}>{item.activityName}</Text>
          <Text style={styles.result}>{getMainResult(item)}</Text>

          {item.participantName && (
            <Text style={styles.detail}>Participant: {item.participantName}</Text>
          )}

          {(item.reflection || item.observation) && (
            <Text style={styles.detail}>
              Reflection: {item.reflection || item.observation}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2563EB",
    textAlign: "center",
    marginTop: 40,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    marginTop: 6,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activity: {
    fontSize: 18,
    fontWeight: "bold",
  },
  result: {
    fontSize: 16,
    color: "#111827",
    marginTop: 6,
    fontWeight: "600",
  },
  detail: {
    marginTop: 6,
    color: "#555",
  },
});