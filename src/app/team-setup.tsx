import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function TeamSetup() {
  const [teamName, setTeamName] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [grade, setGrade] = useState("");

  const discriminator = "TEAM-" + Math.floor(1000 + Math.random() * 9000);

  async function handleContinue() {
    if (!teamName || !member1 || !member2 || !grade) {
      Alert.alert("Missing Details", "Please complete all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "teams"), {
        teamName,
        members: [member1, member2],
        grade,
        discriminator,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Team saved to Firebase.");
      router.push("/home");
    } catch (error: any) {
      console.log("Firebase Error:", error);
      Alert.alert("Firebase Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team Setup</Text>

      <TextInput placeholder="Team Name" style={styles.input} value={teamName} onChangeText={setTeamName} />
      <TextInput placeholder="Team Member 1" style={styles.input} value={member1} onChangeText={setMember1} />
      <TextInput placeholder="Team Member 2" style={styles.input} value={member2} onChangeText={setMember2} />
      <TextInput placeholder="Grade / Year Level" style={styles.input} value={grade} onChangeText={setGrade} />

      <Text style={styles.discriminator}>Assigned Team ID: {discriminator}</Text>

      <Pressable
  style={[styles.button, { height: 70 }]}
  onPress={async () => {
    console.log("CONTINUE PRESSED");

    try {
      console.log("Trying to save team...");

      await addDoc(collection(db, "teams"), {
        teamName,
        members: [member1, member2],
        grade,
        discriminator: "TEAM-2000",
        createdAt: serverTimestamp(),
      });

      alert("Team saved to Firebase");
      router.push("/home");
    } catch (error: any) {
      console.log("FIREBASE ERROR:", error);
      alert(error.message);
    }
  }}
>
  <Text style={styles.buttonText}>Continue</Text>
</Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#F5F7FA" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#2563EB" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 12, backgroundColor: "white" },
  discriminator: { textAlign: "center", marginVertical: 10, fontWeight: "600" },
  button: { backgroundColor: "#2563EB", padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});