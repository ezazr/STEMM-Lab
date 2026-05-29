import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Team</Text>

      <Pressable style={styles.button} onPress={() => router.push("/team-setup")}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 24, color: "#2563EB" },
  button: { backgroundColor: "#2563EB", padding: 15, borderRadius: 10 },
  buttonText: { color: "white", fontWeight: "bold" },
});