import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function ReactionBoard() {
  const [participantName, setParticipantName] = useState("");
  const [dominantHandTime, setDominantHandTime] = useState("");
  const [nonDominantHandTime, setNonDominantHandTime] = useState("");
  const [tracingAccuracy, setTracingAccuracy] = useState("");
  const [observation, setObservation] = useState("");

  async function saveResult() {
    const dominant = Number(dominantHandTime);
    const nonDominant = Number(nonDominantHandTime);
    const accuracy = Number(tracingAccuracy);

    if (
      !participantName ||
      !dominantHandTime ||
      !nonDominantHandTime ||
      !tracingAccuracy ||
      !observation
    ) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (isNaN(dominant) || isNaN(nonDominant) || isNaN(accuracy)) {
      Alert.alert("Invalid input", "Times and accuracy must be valid numbers.");
      return;
    }

    const reactionDifference = nonDominant - dominant;

    try {
      await addDoc(collection(db, "activityResults"), {
        activityName: "Reaction Board Challenge",
        participantName,
        dominantHandTimeSeconds: dominant,
        nonDominantHandTimeSeconds: nonDominant,
        tracingAccuracyPercent: accuracy,
        reactionDifference,
        observation,
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        "Result Saved",
        `Reaction difference: ${reactionDifference.toFixed(2)} seconds`
      );

      setParticipantName("");
      setDominantHandTime("");
      setNonDominantHandTime("");
      setTracingAccuracy("");
      setObservation("");
    } catch (error: any) {
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reaction Board Challenge</Text>
      <Text style={styles.subtitle}>Neuroscience + Mathematics</Text>

      <TextInput
        placeholder="Participant Name"
        style={styles.input}
        value={participantName}
        onChangeText={setParticipantName}
      />

      <TextInput
        placeholder="Dominant hand reaction time (seconds)"
        style={styles.input}
        value={dominantHandTime}
        onChangeText={setDominantHandTime}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Non-dominant hand reaction time (seconds)"
        style={styles.input}
        value={nonDominantHandTime}
        onChangeText={setNonDominantHandTime}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Tracing accuracy (%)"
        style={styles.input}
        value={tracingAccuracy}
        onChangeText={setTracingAccuracy}
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