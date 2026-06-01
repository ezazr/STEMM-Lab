import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function BreathingTrainer() {
  const [participantName, setParticipantName] = useState("");
  const [restingBreaths, setRestingBreaths] = useState("");
  const [afterExerciseBreaths, setAfterExerciseBreaths] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [observation, setObservation] = useState("");

  async function saveResult() {
    const resting = Number(restingBreaths);
    const afterExercise = Number(afterExerciseBreaths);

    if (
      !participantName ||
      !restingBreaths ||
      !afterExerciseBreaths ||
      !exerciseType ||
      !observation
    ) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (isNaN(resting) || isNaN(afterExercise)) {
      Alert.alert("Invalid input", "Breathing rates must be valid numbers.");
      return;
    }

    const breathingIncrease = afterExercise - resting;

    try {
      await addDoc(collection(db, "activityResults"), {
        activityName: "Breathing Pace Trainer",
        participantName,
        restingBreathsPerMinute: resting,
        afterExerciseBreathsPerMinute: afterExercise,
        breathingIncrease,
        exerciseType,
        observation,
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        "Result saved",
        `Breathing increase: ${breathingIncrease} breaths/min`
      );

      setParticipantName("");
      setRestingBreaths("");
      setAfterExerciseBreaths("");
      setExerciseType("");
      setObservation("");
    } catch (error: any) {
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Pace Trainer</Text>
      <Text style={styles.subtitle}>Medical Science</Text>

      <TextInput
        placeholder="Participant Name"
        style={styles.input}
        value={participantName}
        onChangeText={setParticipantName}
      />

      <TextInput
        placeholder="Breaths per minute at rest"
        style={styles.input}
        value={restingBreaths}
        onChangeText={setRestingBreaths}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Breaths per minute after exercise"
        style={styles.input}
        value={afterExerciseBreaths}
        onChangeText={setAfterExerciseBreaths}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Exercise type e.g. jogging or star jumps"
        style={styles.input}
        value={exerciseType}
        onChangeText={setExerciseType}
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