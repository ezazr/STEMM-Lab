import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function Parachute() {
  const [height, setHeight] = useState("");
  const [time, setTime] = useState("");
  const [reflection, setReflection] = useState("");

  async function saveResult() {
    const heightNumber = Number(height);
    const timeNumber = Number(time);

    if (!height || !time || !reflection) {
      Alert.alert("Missing details", "Please enter height, time and reflection.");
      return;
    }

    if (isNaN(heightNumber) || isNaN(timeNumber) || timeNumber <= 0) {
      Alert.alert("Invalid input", "Height and time must be valid numbers.");
      return;
    }

    const finalVelocity = heightNumber / timeNumber;

    try {
      await addDoc(collection(db, "activityResults"), {
        activityName: "Parachute Drop Challenge",
        height: heightNumber,
        time: timeNumber,
        finalVelocity,
        reflection,
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        "Result saved",
        `Final velocity: ${finalVelocity.toFixed(2)} m/s`
      );

      setHeight("");
      setTime("");
      setReflection("");
    } catch (error: any) {
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parachute Drop Challenge</Text>
      <Text style={styles.subtitle}>Engineering + Physics</Text>

      <TextInput
        placeholder="Drop height in metres"
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Drop time in seconds"
        style={styles.input}
        value={time}
        onChangeText={setTime}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Team reflection"
        style={[styles.input, styles.textArea]}
        value={reflection}
        onChangeText={setReflection}
        multiline
      />

      <Pressable style={styles.button} onPress={saveResult}>
        <Text style={styles.buttonText}>Save Result</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563EB",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 24,
    color: "#555",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});