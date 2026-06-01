import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function SoundHunter() {
  const [noiseSource, setNoiseSource] = useState("");
  const [noiseLevel, setNoiseLevel] = useState("");
  const [location, setLocation] = useState("");
  const [observation, setObservation] = useState("");

  async function saveResult() {
    const noiseLevelNumber = Number(noiseLevel);

    if (!noiseSource || !noiseLevel || !location || !observation) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (isNaN(noiseLevelNumber) || noiseLevelNumber < 0) {
      Alert.alert("Invalid input", "Noise level must be a valid number.");
      return;
    }

    let riskLevel = "Safe";
    if (noiseLevelNumber >= 85 && noiseLevelNumber < 100) {
      riskLevel = "Possible hearing risk after long exposure";
    } else if (noiseLevelNumber >= 100) {
      riskLevel = "High hearing risk";
    }

    try {
      await addDoc(collection(db, "activityResults"), {
        activityName: "Sound Pollution Hunter",
        noiseSource,
        noiseLevel: noiseLevelNumber,
        location,
        observation,
        riskLevel,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Result saved", `Noise level: ${noiseLevelNumber} dB\nRisk: ${riskLevel}`);

      setNoiseSource("");
      setNoiseLevel("");
      setLocation("");
      setObservation("");
    } catch (error: any) {
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sound Pollution Hunter</Text>
      <Text style={styles.subtitle}>Environmental Science</Text>

      <TextInput
        placeholder="Noise source e.g. dropping book"
        style={styles.input}
        value={noiseSource}
        onChangeText={setNoiseSource}
      />

      <TextInput
        placeholder="Noise level in dB"
        style={styles.input}
        value={noiseLevel}
        onChangeText={setNoiseLevel}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Location / zone e.g. classroom front"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
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