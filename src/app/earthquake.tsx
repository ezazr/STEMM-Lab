import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function Earthquake() {
  const [designName, setDesignName] = useState("");
  const [pillars, setPillars] = useState("");
  const [folds, setFolds] = useState("");
  const [movement, setMovement] = useState("");
  const [observation, setObservation] = useState("");

  async function saveResult() {
    const pillarsNumber = Number(pillars);
    const foldsNumber = Number(folds);
    const movementNumber = Number(movement);

    if (!designName || !pillars || !folds || !movement || !observation) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (isNaN(pillarsNumber) || isNaN(foldsNumber) || isNaN(movementNumber)) {
      Alert.alert("Invalid input", "Pillars, folds and movement must be numbers.");
      return;
    }

    try {
      await addDoc(collection(db, "activityResults"), {
        activityName: "Earthquake-Resistant Structure",
        designName,
        pillars: pillarsNumber,
        folds: foldsNumber,
        movementCm: movementNumber,
        observation,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Result saved", "Earthquake structure result saved to Firebase.");

      setDesignName("");
      setPillars("");
      setFolds("");
      setMovement("");
      setObservation("");
    } catch (error: any) {
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earthquake-Resistant Structure</Text>
      <Text style={styles.subtitle}>Engineering + Earth Science</Text>

      <TextInput
        placeholder="Design name e.g. 4 folds + 4 pillars"
        style={styles.input}
        value={designName}
        onChangeText={setDesignName}
      />

      <TextInput
        placeholder="Number of pillars"
        style={styles.input}
        value={pillars}
        onChangeText={setPillars}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Number of folds"
        style={styles.input}
        value={folds}
        onChangeText={setFolds}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Phone movement in cm"
        style={styles.input}
        value={movement}
        onChangeText={setMovement}
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
    fontSize: 29,
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