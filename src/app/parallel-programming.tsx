import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function ParallelProgramming() {
  const [result, setResult] = useState("");

  async function taskOne() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("GPS Task Finished"), 2000);
    });
  }

  async function taskTwo() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Battery Task Finished"), 3000);
    });
  }

  async function taskThree() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Notification Task Finished"), 1000);
    });
  }

  async function runParallelTasks() {
    setResult("Running parallel tasks...");

    const results = await Promise.all([
      taskOne(),
      taskTwo(),
      taskThree(),
    ]);

    setResult(results.join("\n"));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parallel Programming</Text>

      <Text style={styles.subtitle}>
        Multiple tasks executed simultaneously
      </Text>

      <Pressable style={styles.button} onPress={runParallelTasks}>
        <Text style={styles.buttonText}>Run Parallel Tasks</Text>
      </Pressable>

      <View style={styles.card}>
        <Text>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 24,
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
    marginTop: 6,
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
});