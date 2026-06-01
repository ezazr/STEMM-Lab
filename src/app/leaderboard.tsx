import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

type ActivityResult = {
  id: string;
  activityName?: string;
  finalVelocity?: number;
  noiseLevel?: number;
  bendAngleDegrees?: number;
  heartRateIncrease?: number;
  reactionDifference?: number;
  participantName?: string;
  teamName?: string;
};

export default function Leaderboard() {
  const [results, setResults] = useState<ActivityResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  async function loadResults() {
    try {
      const q = query(
        collection(db, "activityResults"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ActivityResult[];

      setResults(data);
    } catch (error) {
      console.log("Leaderboard error:", error);
    } finally {
      setLoading(false);
    }
  }

  function getScore(item: ActivityResult) {
    if (item.finalVelocity !== undefined) {
      return `${item.finalVelocity.toFixed(2)} m/s`;
    }

    if (item.noiseLevel !== undefined) {
      return `${item.noiseLevel} dB`;
    }

    if (item.bendAngleDegrees !== undefined) {
      return `${item.bendAngleDegrees}° bend`;
    }

    if (item.heartRateIncrease !== undefined) {
      return `+${item.heartRateIncrease} bpm`;
    }

    if (item.reactionDifference !== undefined) {
      return `${item.reactionDifference.toFixed(2)} sec difference`;
    }

    return "No score";
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.subtitle}>Latest STEMM Lab Activity Results</Text>

      {loading && <Text style={styles.message}>Loading results...</Text>}

      {!loading && results.length === 0 && (
        <Text style={styles.message}>No activity results found.</Text>
      )}

      {results.map((item, index) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.rank}>#{index + 1}</Text>
          <Text style={styles.activity}>{item.activityName}</Text>
          <Text style={styles.score}>{getScore(item)}</Text>

          {item.participantName && (
            <Text style={styles.detail}>Participant: {item.participantName}</Text>
          )}

          {item.teamName && (
            <Text style={styles.detail}>Team: {item.teamName}</Text>
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
    marginBottom: 24,
    marginTop: 6,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 30,
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
  },
  activity: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },
  score: {
    fontSize: 16,
    color: "#111827",
    marginTop: 6,
    fontWeight: "600",
  },
  detail: {
    marginTop: 5,
    color: "#555",
  },
});