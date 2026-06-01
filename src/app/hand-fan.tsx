import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function HandFan() {
  const [fanDesign, setFanDesign] = useState("");
  const [distance, setDistance] = useState("");
  const [bendAngle, setBendAngle] = useState("");
  const [material, setMaterial] = useState("");
  const [observation, setObservation] = useState("");

  async function saveResult() {
    const distanceNumber = Number(distance);
    const bendAngleNumber = Number(bendAngle);

    if (!fanDesign || !distance || !bendAngle || !material || !observation) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (isNaN(distanceNumber) || isNaN(bendAngleNumber)) {
      Alert.alert("Invalid input", "Distance and bend angle must be numbers.");
      return;
    }

    try {
      await addDoc(collection(db, "activityResults"), {
        activityName: "Hand Fan Challenge",
        fanDesign,
        distanceCm: distanceNumber,
        bendAngleDegrees: bendAngleNumber,
        material,
        observation,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Result saved", "Hand Fan Challenge result saved to Firebase.");

      setFanDesign("");
      setDistance("");
      setBendAngle("");
      setMaterial("");
      setObservation("");
    } catch (error: any) {
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hand Fan Challenge</Text>
      <Text style={styles.subtitle}>Physics – Air Movement</Text>

      <TextInput
        placeholder="Fan design e.g. folded paper fan"
        style={styles.input}
        value={fanDesign}
        onChangeText={setFanDesign}
      />

      <TextInput
        placeholder="Distance from paper in cm"
        style={styles.input}
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Bend angle in degrees"
        style={styles.input}
        value={bendAngle}
        onChangeText={setBendAngle}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Material e.g. paper or cardboard"
        style={styles.input}
        value={material}
        onChangeText={setMaterial}
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