import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function TeamSetup() {
  const [teamName, setTeamName] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [grade, setGrade] = useState("");
  const [discriminator, setDiscriminator] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team Setup</Text>

      <TextInput
        placeholder="Team Name"
        style={styles.input}
        value={teamName}
        onChangeText={setTeamName}
      />

      <TextInput
        placeholder="Team Member 1"
        style={styles.input}
        value={member1}
        onChangeText={setMember1}
      />

      <TextInput
        placeholder="Team Member 2"
        style={styles.input}
        value={member2}
        onChangeText={setMember2}
      />

      <TextInput
        placeholder="Grade / Year Level"
        style={styles.input}
        value={grade}
        onChangeText={setGrade}
      />

      <TextInput
        placeholder="Team Discriminator"
        style={styles.input}
        value={discriminator}
        onChangeText={setDiscriminator}
      />

      <Pressable
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2563EB",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});