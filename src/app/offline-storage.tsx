import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

type OfflineResult = {
  id: number;
  activityName: string;
  resultSummary: string;
};

export default function OfflineStorage() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [results, setResults] = useState<OfflineResult[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setupDatabase();
  }, []);

  async function setupDatabase() {
    const database = await SQLite.openDatabaseAsync("stemm_lab.db");

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS offline_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activityName TEXT NOT NULL,
        resultSummary TEXT NOT NULL
      );
    `);

    setDb(database);
    loadResults(database);
  }

  async function saveOfflineResult() {
    if (!db) return;

    await db.runAsync(
      "INSERT INTO offline_results (activityName, resultSummary) VALUES (?, ?);",
      ["Offline Test Activity", "Saved locally using SQLite"]
    );

    setMessage("Offline result saved using SQLite.");
    loadResults(db);
  }

  async function loadResults(database = db) {
    if (!database) return;

    const rows = await database.getAllAsync<OfflineResult>(
      "SELECT * FROM offline_results ORDER BY id DESC;"
    );

    setResults(rows);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Offline Storage</Text>
      <Text style={styles.subtitle}>SQLite Local Database Feature</Text>

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
  container: {
    padding: 24,
    backgroundColor: "#F5F7FA",
    flexGrow: 1,
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
    marginTop: 6,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "600",
    marginBottom: 16,
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
  },
  cardText: {
    color: "#555",
    marginTop: 6,
  },
});