import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function HumanPerformance() {
  const [participantName, setParticipantName] = useState("");
  const [restingHeartRate, setRestingHeartRate] = useState("");
  const [exerciseHeartRate, setExerciseHeartRate] = useState("");
  const [recoveryHeartRate, setRecoveryHeartRate] = useState("");
  const [observation, setObservation] = useState("");

  async function saveResult() {
    const resting = Number(restingHeartRate);
    const exercise = Number(exerciseHeartRate);
    const recovery = Number(recoveryHeartRate);

    if (
      !participantName ||
      !restingHeartRate ||
      !exerciseHeartRate ||
      !recoveryHeartRate ||
      !observation
    ) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (isNaN(resting) || isNaN(exercise) || isNaN(recovery)) {
      Alert.alert("Invalid input", "Heart rates must be valid numbers.");
      return;
    }

    const heartRateIncrease = exercise - resting;
    const recoveryDifference = exercise - recovery;

    try {
      await addDoc(collection(db, "activityResults"), {
        activityName: "Human Performance Lab",
        participantName,
        restingHeartRate: resting,
        exerciseHeartRate: exercise,
        recoveryHeartRate: recovery,
        heartRateIncrease,
        recoveryDifference,
        observation,
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        "Result Saved",
        `Heart Rate Increase: ${heartRateIncrease} bpm`
      );

      setParticipantName("");
      setRestingHeartRate("");
      setExerciseHeartRate("");
      setRecoveryHeartRate("");
      setObservation("");
    } catch (error: any) {
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Human Performance Lab</Text>
      <Text style={styles.subtitle}>Medical Science + Biomechanics</Text>

      <TextInput
        placeholder="Participant Name"
        style={styles.input}
        value={participantName}
        onChangeText={setParticipantName}
      />

      <TextInput
        placeholder="Resting Heart Rate (bpm)"
        style={styles.input}
        value={restingHeartRate}
        onChangeText={setRestingHeartRate}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Exercise Heart Rate (bpm)"
        style={styles.input}
        value={exerciseHeartRate}
        onChangeText={setExerciseHeartRate}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Recovery Heart Rate (bpm)"
        style={styles.input}
        value={recoveryHeartRate}
        onChangeText={setRecoveryHeartRate}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Observation or reflection"
        style={[styles.input, styles.textArea]}
        value={observation}
        onChangeText={setObservation}
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